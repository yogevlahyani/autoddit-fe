import axios from 'axios';
import { actions } from './types';

import autodditJsonData from '../../__mocks__/getAutoddits.json';

export const fetch = () => {

    return (dispatch) => {
        // Uncomment this lines if using Mock API (Not local json)
        // axios.get(process.env.REACT_APP_API_URL + 'getAutoddits')
        //     .then(function (response) {
                dispatch({
                    type: actions.AUTODDIT.FETCH.SUCCESS,
                    data: autodditJsonData
                    // data: response.data
                });
            // })
            // .catch(function (error) {
            //     dispatch({
            //         type: actions.AUTODDIT.FETCH.ERROR,
            //         data: error
            //     });
            // });
    }
};

export const add = (autodditItem) => {
    if (!autodditItem) { return false; }

    return (dispatch) => {
        dispatch({
            type: actions.AUTODDIT.ADD.SUCCESS,
            data: autodditItem
        });
    }
};

export const upvote = (index) => {

    return (dispatch) => {
        dispatch({
            type: actions.AUTODDIT.UPVOTE.SUCCESS,
            data: index
        });
    }
};

export const downvote = (index) => {

    return (dispatch) => {
        dispatch({
            type: actions.AUTODDIT.DOWNVOTE.SUCCESS,
            data: index
        });
    }
};