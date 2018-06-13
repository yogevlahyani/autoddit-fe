import _ from 'lodash';
import { actions } from './types';

const autoddits = localStorage.getItem('autoddits');
const defaultState = JSON.parse(autoddits) || [];

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

        // Fetch
        case actions.AUTODDIT.FETCH.BEGIN:
        case actions.AUTODDIT.FETCH.SUCCESS:
            copy = [ ...copy, ...action.data ];

            return copy;

        case actions.AUTODDIT.FETCH.ERROR:
            copy = Reset(state);
            return copy;

        // Add
        case actions.AUTODDIT.ADD.BEGIN:
        case actions.AUTODDIT.ADD.SUCCESS:
            copy.push(action.data);
            const localAutoddits = JSON.parse(localStorage.getItem('autoddits')) || [];
            localAutoddits.push(action.data);
            // Save added autoddits to localStorage
            localStorage.setItem('autoddits', JSON.stringify(autoddits));

            return copy;

        case actions.AUTODDIT.ADD.ERROR:
            copy = Reset(state);
            return copy;

        // Upvote
        case actions.AUTODDIT.UPVOTE.BEGIN:
        case actions.AUTODDIT.UPVOTE.SUCCESS:
            if (copy[action.data].hasOwnProperty('didDownvote') && copy[action.data].didDownvote) {
                copy[action.data].votes += 2;
            } else {
                copy[action.data].votes += 1;
            }

            copy[action.data].didUpvoted = true;
            delete copy[action.data].didDownvote;

            return copy;

        case actions.AUTODDIT.UPVOTE.ERROR:
            copy = Reset(state);
            return copy;

        // Downvote
        case actions.AUTODDIT.DOWNVOTE.BEGIN:
        case actions.AUTODDIT.DOWNVOTE.SUCCESS:
            if (copy[action.data].hasOwnProperty('didUpvoted') && copy[action.data].didUpvoted) {
                copy[action.data].votes = copy[action.data].votes - 2;
            } else {
                copy[action.data].votes = copy[action.data].votes - 1;
            }
            copy[action.data].didDownvote = true;
            delete copy[action.data].didUpvoted;

            return copy;

        case actions.AUTODDIT.DOWNVOTE.ERROR:
            copy = Reset(state);
            return copy;

        // Add comment
        case actions.COMMENT.ADD.BEGIN:
        case actions.COMMENT.ADD.SUCCESS:
            const { index, user_ref, text, created_at, votes } = action.data;
            copy[index].comments.push({
                user_ref,
                text,
                created_at,
                votes,
                comments_count: 0,
                comments: []
            });

            copy[index].comments_count = copy[index].comments.length;

            return copy;

        case actions.COMMENT.ADD.ERROR:
            copy = Reset(state);
            return copy;


        default:
            return state;
    }
}