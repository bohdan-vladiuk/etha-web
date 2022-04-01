// Components
import { DELETE_COMMENTS, GET_COMMENTS_LIST, GET_USER_COMMENT_COUNT, POST_COMMENTS, EDIT_COMMENTS } from '../services/API';
import { CommentRequest } from '../models';
import api from '../services/api-helper';
import { setComments, setLoaderVisibility } from '../redux';
import { AppDispatch } from '../redux/store';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';

export async function fetchCommentList(
    postId: string,
    page: number,
    size: number,
    dispatch: AppDispatch,
): Promise<void> {
    dispatch(setLoaderVisibility(true));
    api.get(GET_COMMENTS_LIST, {
        params: {
            postId: postId,
            page: page,
            size: size,
        },
    })
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
                FirebaseAnalytics.logEvent({
                    name: 'post_comment_success',
                    params: {
                    userId: userId,
                    statementId: comment.postId,
                    commentId: response.data.content[0].id,
                    }
                });
                FirebaseAnalytics.logEvent({
                    name: 'comment_submit_success',
                    params: {
                    userId: userId,
                    commentId: response.data.content[0].id,
                    }
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
                    cleanFunction(response.data)
                }
            },
            (err) => {
                console.log('Error: ', err);
            },
        )
        .finally(() => {
            dispatch(setLoaderVisibility(false));
        })
}
