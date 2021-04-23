import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import Header from './components/Header';
import NotFound from './components/NotFound';
import CartFeature from './features/Cart';
import ProductFeature from './features/Product';
import './reset.css';

function App() {
    return (
        <div>
            <Header />

            <Switch>
                <Redirect from='/' to='/products' exact />
                <Route component={ProductFeature} path='/products' />
                <Route component={CartFeature} path='/cart' />

                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default App;
