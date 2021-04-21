import { Box } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

const ProductFeature = () => {
    const match = useRouteMatch();
    console.log(`${match.url}/:productId`);
    return (
        <Box pt={3}>
            <Switch>
                <Route path={match.url} exact component={ListPage} />
                <Route
                    path={`${match.url}/:productId`}
                    component={DetailPage}
                />
            </Switch>
        </Box>
    );
};

export default ProductFeature;
