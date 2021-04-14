import { Box } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ListPage from './pages/ListPage';

const ProductFeature = () => {
    const match = useRouteMatch();
    return (
        <Box pt={3}>
            <Switch>
                <Route path={match.url} exact component={ListPage} />
            </Switch>
        </Box>
    );
};

export default ProductFeature;
