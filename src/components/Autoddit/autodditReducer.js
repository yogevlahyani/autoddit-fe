import _ from 'lodash';
import { actions } from './types';

const defaultState = [];

const Copy = (state) => {
    return _.clone(state);
};

const Reset = (state) => {
    let copy = Copy(state);

    copy = defaultState;

    return copy;
};

const updateCommentCount = (copy) => {
    const comments = copy.filter(a => a.ref);
    // const autoddits = copy.filter(a => !a.ref);

    // autoddits.forEach(a => {
    //     const childrenComments = comments.filter(c => c.ref === a.id);
    //     console.log('childrenComments', childrenComments);
    //
    //     childrenComments.forEach(cc => {
    //         const innerComments = comments.filter(c => c.ref === cc.id && c.ref !== a.id);
    //         console.log('innerComments', innerComments);
    //     });
    //
    // });

    copy.forEach(a => {
       a.comments_count = comments.filter(c => c.ref === a.id).length;
    });
};

export default (state = defaultState, action) => {
    let copy = Copy(state);

    switch (action.type) {

        // Fetch
        case actions.AUTODDIT.FETCH.BEGIN:
        case actions.AUTODDIT.FETCH.SUCCESS:
            copy = _.concat(copy, action.data) ;
            copy = _.uniqBy(copy, 'id') ;

            updateCommentCount(copy);

            return copy;

        case actions.AUTODDIT.FETCH.ERROR:
            copy = Reset(state);
            return copy;

        // Add
        case actions.AUTODDIT.ADD.BEGIN:
        case actions.AUTODDIT.ADD.SUCCESS:
            copy.push(action.data);

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
            const { user_ref, text, created_at, votes, id, ref } = action.data;
            copy.push({
                id,
                user_ref,
                ref,
                text,
                created_at,
                votes,
                comments_count: 0
            });

            updateCommentCount(copy);

            return copy;

        case actions.COMMENT.ADD.ERROR:
            copy = Reset(state);
            return copy;


        default:
            return state;
    }
}