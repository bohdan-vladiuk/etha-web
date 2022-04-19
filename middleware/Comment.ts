// Components
import {
    DELETE_COMMENTS,
    GET_COMMENTS_LIST,
    GET_USER_COMMENT_COUNT,
    POST_COMMENTS,
    EDIT_COMMENTS,
    SET_COMMENT_REACTION,
} from '../services/API';
import { CommentReactionRequest, CommentRequest, ReactionCount } from '../models';
import api from '../services/api-helper';
import { setComments, setLoaderVisibility } from '../redux';
import { AppDispatch } from '../redux/store';
import { firebaseAnalytics } from '../auth/firebaseClient';

export async function fetchCommentList(
    postId: string,
    token: string,
    page: number,
    size: number,
    dispatch: AppDispatch,
): Promise<void> {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: {
            postId: postId,
            page: page,
            size: size,
        },
    };

    api.get(GET_COMMENTS_LIST, config)
        .then(
            (response) => {
                dispatch(setComments(page, response.data));
            },
            (err) => {
                dispatch(setComments(0, {}));
                console.log('Error: ', err);
            },
        )
        .finally(() => {
            dispatch(setLoaderVisibility(false));
        });
}
export async function fetchUserCommentCount(token: string, setFunction: (commentCount: number) => void): Promise<void> {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    api.get(GET_USER_COMMENT_COUNT, config).then(
        (response) => {
            setFunction(response.data.count);
        },
        (err) => {
            console.log('Error: ', err);
        },
    );
}

export async function postComment(
    token: string,
    userId: string,
    comment: CommentRequest,
    dispatch: AppDispatch,
): Promise<void> {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    dispatch(setLoaderVisibility(true));
    api.post(POST_COMMENTS, comment, config)
        .then(
            (response) => {
                firebaseAnalytics.logEvent('post_comment_success', {
                    userId: userId,
                    statementId: comment.postId,
                });
                dispatch(setComments(0, response.data));
            },
            (err) => {
                console.log('Error: ', err);
            },
        )
        .finally(() => {
            dispatch(setLoaderVisibility(false));
        });
}
export async function deleteComment(
    token: string,
    commentId: string,
    dispatch: AppDispatch,
    cleanFunction: (success: boolean) => void,
): Promise<void> {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    dispatch(setLoaderVisibility(true));
    api.delete(DELETE_COMMENTS + `/${commentId}`, config)
        .then(
            (response) => {
                if (response) {
                    cleanFunction(response.data);
                }
            },
            (err) => {
                console.log('Error: ', err);
            },
        )
        .finally(() => {
            dispatch(setLoaderVisibility(false));
        });
}

export async function updateComment(
    token: string,
    comment: CommentRequest,
    dispatch: AppDispatch,
    cleanFunction: (data: [Comment]) => void,
): Promise<void> {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    dispatch(setLoaderVisibility(true));
    api.put(EDIT_COMMENTS, comment, config)
        .then(
            (response) => {
                if (response) {
                    cleanFunction(response.data);
                }
            },
            (err) => {
                console.log('Error: ', err);
            },
        )
        .finally(() => {
            dispatch(setLoaderVisibility(false));
        });
}

export async function postReaction(
    token: string,
    userId: string,
    commentReactionRequest: CommentReactionRequest,
    dispatch: AppDispatch,
    setFunction: (reactionCount: ReactionCount) => void,
): Promise<void> {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    dispatch(setLoaderVisibility(true));
    api.post(SET_COMMENT_REACTION, commentReactionRequest, config)
        .then(
            (response) => {
                setFunction(response.data);
                firebaseAnalytics.logEvent('comment_reaction_submit_success', {
                    userId: userId,
                    commentId: commentReactionRequest.commentId,
                    value: commentReactionRequest.value,
                });
            },
            (err) => {
                console.log('Error: ', err);
            },
        )
        .finally(() => {
            dispatch(setLoaderVisibility(false));
        });
}
