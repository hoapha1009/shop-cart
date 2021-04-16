import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import productApi, { IProduct } from '../../../api/productApi';
import ProductList from '../components/ProductList';
import ProductSkeleton from '../components/ProductSkeleton';

export type IProductList = IProduct[];

const useStyles = makeStyles((theme) => ({
    left: {
        width: '250px',
    },
    right: {
        flex: '1 1 0',
    },
}));

const ListPage = () => {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [productList, setProductList] = React.useState<IProductList>();

    React.useEffect(() => {
        (async () => {
            try {
                const { data }: any = await productApi.getAll({
                    _page: 1,
                    _limit: 10,
                });
                console.log('data', data);

                setProductList(data);
            } catch (error) {
                console.log('Failed to fetch product list!', error);
            }

            // setLoading(false)
        })();
    }, []);

    return (
        <Box>
            <Container>
                <Grid container>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>Left column</Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            {loading ? (
                                <ProductSkeleton length={6} />
                            ) : (
                                <ProductList data={productList} />
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ListPage;
