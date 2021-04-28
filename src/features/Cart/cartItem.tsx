import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAppDispatch } from '../../app/hooks';
import QuantityField from '../../components/form-controls/QuantityField';
import { formatPrice } from '../../utils';
import { IInputAddToCartForm } from '../Product/components/AddToCartForm';
import ProductThumbnail from '../Product/components/ProductThumbnail';
import { removeFromCart, setQuantity } from './cartSlice';

interface Props {
    product: any | {};
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    image: {
        width: '220px',
    },
    content: {
        width: `calc(100% - 220px)`,
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
    },
    desc: {
        width: '60%',
        padding: theme.spacing(2),
        fontSize: '24px',
    },
    actions: {
        marginTop: theme.spacing(2),
        color: 'rgb(13, 92, 182)',
        fontSize: '13px',
        cursor: 'pointer',
    },
    freeship: {
        marginBottom: theme.spacing(2),
        color: 'rgb(0, 153, 0)',
        fontSize: '15px',
    },
    detail: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
    },
    product_pricess: {
        textAlign: 'right',
        marginRight: '25px',
    },
    salePrice: {
        marginTop: theme.spacing(4),
        fontSize: '20px',
        marginBottom: '5px',
        fontWeight: 'bold',
        display: 'inline-block',
    },
    promotion: { fontSize: '14px' },
    originalPrice: {
        marginBottom: '8px',
        paddingRight: theme.spacing(1),
        color: 'rgb(162, 162, 162)',
        textDecoration: 'line-through',
        borderRight: `2px solid ${theme.palette.grey[400]}`,
    },
    promotionPercent: {
        fontWeight: 'bold',
    },
    qty: {},
}));

const CartItem = (props: Props) => {
    const { product } = props;
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const schema = yup.object().shape({
        quantity: yup
            .number()
            .required('Nhập số lượng muốn mua!')
            .min(1, 'Số lượng ít nhất là 1!')
            .typeError('Vui lòng nhập đúng số lượng!'),
    });
    const form = useForm<IInputAddToCartForm>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            quantity: product.quantity,
        },
        resolver: yupResolver(schema),
    });

    const handleChangeQuantity = (newValue: number) => {
        const action = setQuantity({
            id: product.id,
            quantity: newValue,
        });
        dispatch(action);
    };

    const handleDeleteClick = (id: number | string) => {
        const action = removeFromCart(id);
        dispatch(action);
    };

    return (
        <Paper elevation={0} className={classes.root}>
            <Grid container>
                <Grid item className={classes.image}>
                    <ProductThumbnail
                        product={product}
                        width='200px'
                        height='200px'
                    />
                </Grid>
                <Grid item className={classes.content}>
                    <Box className={classes.desc}>
                        <Box className={classes.freeship}>
                            {product.product.isFreeShip
                                ? 'Bạn được miễn phí vận chuyển!'
                                : ''}
                        </Box>
                        {product.product.name}
                        <Box
                            className={classes.actions}
                            onClick={() => handleDeleteClick(product.id)}
                        >
                            Xóa
                        </Box>
                    </Box>
                    <Box className={classes.detail}>
                        <Box className={classes.product_pricess}>
                            <Box className={classes.salePrice}>
                                {formatPrice(product.product.salePrice)}
                            </Box>
                            <Box className={classes.promotion}>
                                {product.product.promotionPercent > 0 && (
                                    <>
                                        <Box
                                            component='span'
                                            className={classes.originalPrice}
                                        >
                                            {formatPrice(
                                                product.product.originalPrice
                                            )}
                                        </Box>
                                        <Box
                                            component='span'
                                            className={classes.promotionPercent}
                                        >
                                            {` -${product.product.promotionPercent}%`}
                                        </Box>
                                    </>
                                )}
                            </Box>
                        </Box>
                        <Box className={classes.qty}>
                            <form>
                                <QuantityField
                                    name='quantity'
                                    label=''
                                    form={form}
                                    onChange={handleChangeQuantity}
                                />
                            </form>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CartItem;
