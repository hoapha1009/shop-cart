import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Header from './components/Header';
import NotFound from './components/NotFound';
import CounterFeature from './features/Counter';
import './reset.css';

function App() {
    return (
        <div>
            <Header />

            <Switch>
                <Route component={CounterFeature} path='/' exact />

                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default App;
