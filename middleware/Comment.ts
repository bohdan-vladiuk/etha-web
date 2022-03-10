// Components
import { GET_COMMENTS_LIST, GET_USER_COMMENT_COUNT, POST_COMMENTS } from '../services/API';
import { CommentRequest } from '../models';
import api from '../services/api-helper';
import { setComments, setLoaderVisibility } from '../redux';
import { AppDispatch } from '../redux/store';
import ReactGA from 'react-ga';

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
                ReactGA.event({
                    category: 'comment_submit_success',
                    action: `Comment Submitted Succesfully`,
                    dimension1: userId,
                    dimension2: comment.id,
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
