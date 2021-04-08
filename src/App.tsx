import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import NotFound from "./components/NotFound";
import CounterFeature from "./features/Counter";
import TodoFeature from "./features/Todo";
import "./reset.css";

function App() {
    return (
        <div>
            <Switch>
                <Route component={CounterFeature} path="/" exact />
                <Route component={TodoFeature} path="/todos" />

                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default App;
