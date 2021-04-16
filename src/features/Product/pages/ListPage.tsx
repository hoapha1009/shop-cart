import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
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
    pagination: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        marginTop: '20px',
        paddingBottom: '10px',
    },
}));

const ListPage = () => {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(true);
    const [productList, setProductList] = React.useState<IProductList>();
    const [pagination, setPagination] = React.useState({
        limit: 12,
        page: 1,
        total: 12,
    });
    const [filters, setFilters] = React.useState({
        _page: 1,
        _limit: 12,
    });

    React.useEffect(() => {
        (async () => {
            try {
                const { data, pagination }: any = await productApi.getAll(
                    filters
                );
                console.log(data, pagination);

                setProductList(data);
                setPagination(pagination);
            } catch (error) {
                console.log('Failed to fetch product list!', error);
            }

            setLoading(false);
        })();
    }, [filters]);

    const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _page: page,
        }));
    };

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
                                <ProductSkeleton length={9} />
                            ) : (
                                <ProductList data={productList} />
                            )}

                            <Box className={classes.pagination}>
                                <Pagination
                                    color='primary'
                                    count={Math.ceil(
                                        pagination.total / pagination.limit
                                    )}
                                    page={pagination.page}
                                    onChange={handleChangePage}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ListPage;
