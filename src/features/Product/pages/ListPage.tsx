import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import categoryApi from '../../../api/categoryApi';
import productApi, { IProduct } from '../../../api/productApi';
import FilterViewer from '../components/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeleton from '../components/ProductSkeleton';
import ProductSort from '../components/ProductSort';
import queryString from 'query-string';

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
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(true);
    const [productList, setProductList] = React.useState<IProductList>();
    const [categoryPicked, setCategoryPicked] = React.useState();
    const [pagination, setPagination] = React.useState({
        limit: 12,
        page: 1,
        total: 12,
    });
    const queryParams: any = React.useMemo(() => {
        const params: any = queryString.parse(location.search);
        return {
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params._limit) || 12,
            _sort: params._sort || 'salePrice:ASC',
            isPromotion: params.isPromotion === 'true',
            isFreeShip: params.isFreeShip === 'true',
        };
    }, [location.search]);

    React.useEffect(() => {
        (async () => {
            try {
                const { data, pagination }: any = await productApi.getAll(
                    queryParams
                );

                setProductList(data);
                setPagination(pagination);
            } catch (error) {
                console.log('Failed to fetch product list!', error);
            }

            setLoading(false);
        })();
    }, [queryParams]);

    React.useEffect(() => {
        (async () => {
            try {
                if (!queryParams['category.id']) {
                    return;
                } else {
                    const list: any = await categoryApi.get(
                        Number.parseInt(queryParams['category.id'])
                    );

                    setCategoryPicked(list);
                }
            } catch (error) {
                console.log('Failed to fetch category list!', error);
            }
        })();
    }, [queryParams]);

    const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => {
        const filters = {
            ...queryParams,
            _page: page,
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    };

    const handleSortChange = (newSortValue: string) => {
        const filters = {
            ...queryParams,
            _sort: newSortValue,
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    };

    const handleFiltersChange = (newFilters: any) => {
        const filters = {
            ...queryParams,
            ...newFilters,
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    };

    const setNewFilters = (newFilters: any) => {
        const filters = {
            ...newFilters,
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    };

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilters
                                filters={queryParams}
                                onChange={handleFiltersChange}
                            />
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort
                                activeSort={queryParams._sort}
                                onChange={handleSortChange}
                            />

                            <FilterViewer
                                filters={queryParams}
                                onChange={setNewFilters}
                                categoryPicked={categoryPicked}
                            />

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
