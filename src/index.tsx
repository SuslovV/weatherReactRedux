import React from 'react';
import ReactDOM from 'react-dom';
import {App, REGIONS} from './components/App';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import reducer from './reducers'

const middleware = [ thunk ];

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/region/Moscow,ru">Погода в Москве</Link>
                    </li>
                </ul>
            </nav>

            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/region/:region" component={App} />
                <Route>
                    <h1>Have no any match 404!</h1>
                </Route>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'));
