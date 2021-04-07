import React from "react";
import { Route, Switch } from "react-router";
import "./reset.css";
import "./App.css";
import NotFound from "./components/NotFound";
import TodoFeature from "./features/Todo";

function App() {
    return (
        <div>
            <Switch>
                <Route component={TodoFeature} path="/" exact />
                <Route component={TodoFeature} path="/todos" />

                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default App;
