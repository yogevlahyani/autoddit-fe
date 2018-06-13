import { actions } from './types';

export const add = (details) => {
    if (!details) { return false; }

    return (dispatch) => {
        dispatch({
            type: actions.COMMENT.ADD.SUCCESS,
            data: details
        });
    }
};