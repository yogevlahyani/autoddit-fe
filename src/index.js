import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
    BrowserRouter as Router,
    Route, Switch
} from "react-router-dom";

// Configurations
import configureStore from "./stores";

// Components
import App from "./App";
import NoMatch from './NoMatch';
import { LoginComponent } from "./components/Login";
import { HeaderComponent } from "./components/Header";
import { AddAutodditComponent } from "./components/Autoddit";

// Redux
const store = configureStore();

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <div className="autoddit">
                <HeaderComponent />
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/login" component={LoginComponent} />
                    <Route exact path="/autoddit/add" component={AddAutodditComponent} />
                    <Route component={NoMatch} />
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);