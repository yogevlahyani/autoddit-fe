import { actions as commentActions } from './Comments/types';

export const actions = {
    ...commentActions,
    AUTODDIT: {
        FETCH: {
            BEGIN: 'AUTODDIT_FETCH_BEGIN',
            SUCCESS: 'AUTODDIT_FETCH_SUCCESS',
            ERROR: 'AUTODDIT_FETCH_ERROR'
        },
        ADD: {
            BEGIN: 'AUTODDIT_ADD_BEGIN',
            SUCCESS: 'AUTODDIT_ADD_SUCCESS',
            ERROR: 'AUTODDIT_ADD_ERROR'
        },
        UPVOTE: {
            BEGIN: 'AUTODDIT_UPVOTE_BEGIN',
            SUCCESS: 'AUTODDIT_UPVOTE_SUCCESS',
            ERROR: 'AUTODDIT_UPVOTE_ERROR'
        },
        DOWNVOTE: {
            BEGIN: 'AUTODDIT_DOWNVOTE_BEGIN',
            SUCCESS: 'AUTODDIT_DOWNVOTE_SUCCESS',
            ERROR: 'AUTODDIT_DOWNVOTE_ERROR'
        }
    }
};