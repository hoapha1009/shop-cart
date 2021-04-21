import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import ReactLoading from 'react-loading';
import { useRouteMatch } from 'react-router';
import AddToCartForm from '../components/AddToCartForm';
import ProductInfo from '../components/ProductInfo';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';
import { IInputAddToCartForm } from '../components/AddToCartForm';

const useStyles = makeStyles((theme) => ({
    root: {},
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

const DetailPage = () => {
    const classes = useStyles();
    const { params } = useRouteMatch();
    const { product, loading } = useProductDetail(params);

    if (loading) {
        return (
            <Box className={classes.loading}>
                <ReactLoading
                    type='spinningBubbles'
                    color='#000'
                    height={667}
                    width={375}
                />
            </Box>
        );
    }

    const handleAddToCartForm = (values: IInputAddToCartForm) => {
        console.log(values);
    };

    return (
        <Box className='root'>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <ProductThumbnail product={product} />
                        </Grid>
                        <Grid item className={classes.right}>
                            <ProductInfo product={product} />
                            <AddToCartForm onSubmit={handleAddToCartForm} />
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default DetailPage;
