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
    const [categoryList, setCategorylist] = React.useState();
    const [pagination, setPagination] = React.useState({
        limit: 12,
        page: 1,
        total: 12,
    });
    const queryParams: any = queryString.parse(location.search);
    console.log(
        'queryParams',
        typeof Number.parseInt(queryParams['category.id'])
    );

    const [filters, setFilters] = React.useState(() => ({
        ...queryParams,
        _page: Number.parseInt(queryParams._page) || 1,
        _limit: Number.parseInt(queryParams._limit) || 12,
        _sort: queryParams._sort || 'salePrice:ASC',
    }));
    console.log('filters', filters);

    React.useEffect(() => {
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    }, [history, filters]);

    React.useEffect(() => {
        (async () => {
            try {
                const { data, pagination }: any = await productApi.getAll(
                    filters
                );

                setProductList(data);
                setPagination(pagination);
            } catch (error) {
                console.log('Failed to fetch product list!', error);
            }

            setLoading(false);
        })();
    }, [filters]);

    React.useEffect(() => {
        (async () => {
            try {
                let list: any;
                if (queryParams['category.id']) {
                    list = await categoryApi.get(
                        Number.parseInt(queryParams['category.id'])
                    );
                    console.log('list', list);
                    setCategorylist(list);
                } else {
                    list = await categoryApi.getAll();
                    console.log('list', list);
                    setCategorylist(
                        list.map((item: any) => ({
                            id: item.id,
                            name: item.name,
                        }))
                    );
                }
            } catch (error) {
                console.log('Failed to fetch category list!', error);
            }
        })();
    }, [history.location.search]);

    const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => {
        setFilters((prevFilters: any) => ({
            ...prevFilters,
            _page: page,
        }));
    };

    const handleSortChange = (newSortValue: string) => {
        setFilters((prevFilters: any) => ({
            ...prevFilters,
            _sort: newSortValue,
        }));
    };

    const handleFiltersChange = (newFilters: any) => {
        setFilters((prevFilters: any) => ({
            ...prevFilters,
            ...newFilters,
        }));
    };

    const setNewFilters = (newFilters: any) => {
        setFilters(newFilters);
    };
    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilters
                                filters={filters}
                                onChange={handleFiltersChange}
                            />
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort
                                activeSort={filters._sort}
                                onChange={handleSortChange}
                            />

                            <FilterViewer
                                filters={filters}
                                onChange={setNewFilters}
                                categoryList={categoryList}
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
