// import axios from 'axios';
import { actions } from './types';

export const login = (name) => {
    if (!name) { return false; }

    return (dispatch) => {
        // Uncomment this line if using Mock API (Not local json)
        // axios.post(process.env.REACT_APP_API_URL + 'login', {
        //     name
        // })
        // .then(function (response) {
        //     dispatch({
        //         type: actions.USER.LOGIN.SUCCESS,
        //         data: name
        //     });
        // })
        // .catch(function (error) {
        //     dispatch({
        //         type: actions.USER.LOGIN.ERROR,
        //         data: error
        //     });
        // });

        dispatch({
            type: actions.USER.LOGIN.SUCCESS,
            data: name
        });
    }
};

export const logout = () => {

    return (dispatch) => {
        dispatch({
            type: actions.USER.LOGOUT.SUCCESS
        });
    }
};