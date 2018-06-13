import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './../reducers';

export default (initialState = {}) => {
    // Redux devtools - Remove on production
    // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    return createStore(reducers, initialState, applyMiddleware(ReduxThunk));
}
