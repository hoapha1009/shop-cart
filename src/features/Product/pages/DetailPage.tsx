import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import ReactLoading from 'react-loading';
import { Route, Switch, useRouteMatch } from 'react-router';
import { useAppDispatch } from '../../../app/hooks';
import { addToCart } from '../../Cart/cartSlice';
import AddToCartForm, {
    IInputAddToCartForm,
} from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(3),
    },
    left: {
        width: '400px',
        padding: theme.spacing(1.5),
        borderRight: `1px solid ${theme.palette.grey[300]}`,
    },
    right: {
        flex: '1 1 0',
        padding: theme.spacing(1.5),
    },
    loading: {
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

const DetailPage = () => {
    const classes = useStyles();
    const { params, url } = useRouteMatch();
    const { product, loading } = useProductDetail(params);
    const dispatch = useAppDispatch();

    if (loading) {
        return (
            <Box className={classes.loading}>
                <ReactLoading
                    type='spinningBubbles'
                    color='#3F51B5'
                    height={200}
                    width={200}
                />
            </Box>
        );
    }

    const handleAddToCartForm = (values: IInputAddToCartForm) => {
        const action: any = addToCart({
            id: product.id,
            product,
            quantity: values.quantity,
        });
        dispatch(action);
    };

    return (
        <Box className={classes.root}>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <ProductThumbnail
                                product={product}
                                width='100%'
                                height='400px'
                            />
                        </Grid>
                        <Grid item className={classes.right}>
                            <ProductInfo product={product} />
                            <AddToCartForm onSubmit={handleAddToCartForm} />
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={0}>
                    <ProductMenu />
                </Paper>

                <Switch>
                    <Route exact path={url}>
                        <ProductDescription product={product} />
                    </Route>
                    <Route exact path={`${url}/additional`}>
                        <ProductAdditional product={product} />
                    </Route>
                    <Route exact path={`${url}/reviews`}>
                        <ProductReviews />
                    </Route>
                </Switch>
            </Container>
        </Box>
    );
};

export default DetailPage;
