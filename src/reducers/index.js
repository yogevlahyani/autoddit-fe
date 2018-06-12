import { combineReducers } from 'redux';

// Reducers
import { LoginReducer } from './../components/Login';
import { AutodditReducer } from './../components/Autoddit';

const reducers = {
    user: LoginReducer,
    autoddits: AutodditReducer
};

export default combineReducers(reducers);