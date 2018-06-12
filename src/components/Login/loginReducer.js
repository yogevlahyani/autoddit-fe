import _ from 'lodash';
import { actions } from './types';

// Simulates token
const user = localStorage.getItem('user');
const defaultState = JSON.parse(user) || {};

const Copy = (state) => {
    return _.clone(state);
};

const Reset = (state) => {
    let copy = Copy(state);

    copy = defaultState;

    return copy;
};

export default (state = defaultState, action) => {
    let copy = Copy(state);

    switch (action.type) {

        // Login
        case actions.USER.LOGIN.BEGIN:
        case actions.USER.LOGIN.SUCCESS:
            copy.name = action.data;
            localStorage.setItem('user', JSON.stringify(copy));

            return copy;

        case actions.USER.LOGIN.ERROR:
            copy = Reset(state);
            return copy;

        // Logout
        case actions.USER.LOGOUT.BEGIN:
        case actions.USER.LOGOUT.SUCCESS:
            copy = {};
            localStorage.setItem('user', JSON.stringify(copy));

            return copy;

        case actions.USER.LOGOUT.ERROR:
            return copy;

        default:
            return state;
    }
}