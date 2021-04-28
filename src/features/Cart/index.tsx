import {
    Box,
    Button,
    Container,
    Grid,
    makeStyles,
    Paper,
    Theme,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { formatPrice } from '../../utils';
import CartItem from './cartItem';
import {
    cartItemsCountSelector,
    cartItemsTotalSelector,
} from './cartSelectors';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    checkout: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        padding: theme.spacing(2),
    },
    text: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
    },
    countNumber: {
        marginLeft: theme.spacing(1),
        fontSize: '16px',
        fontWeight: 300,
    },
    price: {
        marginLeft: theme.spacing(1),
        fontSize: '24px',
        color: theme.palette.secondary.main,
    },
    button: {
        marginLeft: theme.spacing(2),
    },
}));

const CartFeature = () => {
    const classes = useStyles();
    const history = useHistory();
    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const cartItemsCount = useAppSelector(cartItemsCountSelector);
    const cartItemsTotal = useAppSelector(cartItemsTotalSelector);
    return (
        <Box>
            <Container>
                <Box className={classes.checkout}>
                    <Typography variant='h6'>
                        GIỎ HÀNG:
                        <Box component='span' className={classes.countNumber}>
                            ({`${cartItemsCount} sản phẩm`})
                        </Box>
                    </Typography>
                    <Typography variant='h6'>
                        THÀNH TIỀN:
                        <Box component='span' className={classes.price}>
                            {formatPrice(cartItemsTotal)}
                        </Box>
                        <Box component='span' className={classes.button}>
                            <Button
                                variant='contained'
                                color='secondary'
                                size='large'
                                // onClick={}
                            >
                                Thanh toán
                            </Button>
                        </Box>
                    </Typography>
                </Box>

                <Grid container spacing={1}>
                    {cartItemsCount > 0 ? (
                        <>
                            <Grid item xs={12}>
                                {cartItems.map((product: any) => (
                                    <CartItem
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </Grid>
                        </>
                    ) : (
                        <Grid item xs={12}>
                            <Paper className={classes.root} elevation={0}>
                                <img
                                    src='https://salt.tikicdn.com/desktop/img/mascot@2x.png'
                                    alt='empty-cart'
                                    width='190px'
                                />
                                <Typography
                                    variant='body1'
                                    className={classes.text}
                                >
                                    Không có sản phẩm nào trong giỏ hàng của bạn
                                </Typography>
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    size='large'
                                    onClick={() => history.push('/')}
                                >
                                    Tiếp tục mua sắm
                                </Button>
                            </Paper>
                        </Grid>
                    )}
                </Grid>

                {/* {cartItemsCount > 0 ? (
                    cartItems.map((product: any) => (
                        <CartItem key={product.id} product={product} />
                    ))
                    
                ) : (
                    <Paper className={classes.root}>
                        <img
                            src='https://salt.tikicdn.com/desktop/img/mascot@2x.png'
                            alt='empty-cart'
                            width='190px'
                        />
                        <Typography variant='body1' className={classes.text}>
                            Không có sản phẩm nào trong giỏ hàng của bạn
                        </Typography>
                        <Button
                            variant='contained'
                            color='secondary'
                            size='large'
                            onClick={() => history.push('/')}
                        >
                            Tiếp tục mua sắm
                        </Button>
                    </Paper>
                )} */}
            </Container>
        </Box>
    );
};

export default CartFeature;
