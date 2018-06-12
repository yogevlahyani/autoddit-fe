import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './../reducers';

export default (initialState = {}) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    return createStore(reducers, initialState, composeEnhancers(applyMiddleware(ReduxThunk)));
}