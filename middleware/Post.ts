// Dependencies

// Components
import {
    GET_NEW_POSTS,
    GET_HOT_POSTS,
    GET_POST,
    SEARCH_POSTS,
    PUBLIC_FIGURE_POSTS,
    GET_POSTS_COUNT,
    GET_POST_TAG,
    CREATE_POST,
} from '../services/API';
import { CreatePostRequest, Post } from '../models';
import api from '../services/api-helper';
import { AppDispatch } from '../redux/store';
import { setHotPosts, setLoaderVisibility, setNewPosts, setUserPosts, setSearchPosts } from '../redux';

export async function fetchHotPosts(page: number, token: string, dispatch: AppDispatch): Promise<void> {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: page, size: 5 },
    };
    api.get(GET_HOT_POSTS, config)
        .then(
            (response) => {
                dispatch(setHotPosts(page, response.data));
            },
            (err) => {
                dispatch(setHotPosts(0, {}));
                console.log('Error: ', err);
            },
        )
        .finally(() => {
            dispatch(setLoaderVisibility(false));
        });
}
export async function fetchPostCount(returnFunction: (count: number) => void): Promise<void> {
    api.get(GET_POSTS_COUNT).then(
        (response) => {
            returnFunction(response.data);
        },
        (err) => {
            console.log('Error: ', err);
        },
    );
}
export async function fetchUserPosts(
    userId: string,
    page: number,
    token: string,
    dispatch: AppDispatch,
): Promise<void> {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId: userId, page: page, size: 10 },
    };
    api.get(PUBLIC_FIGURE_POSTS, config)
        .then(
            (response) => {
                console.log();
                dispatch(setUserPosts(page, response.data));
            },
            (err) => {
                dispatch(setUserPosts(0, {}));
                console.log('Error: ', err);
            },
        )
        .finally(() => {
            dispatch(setLoaderVisibility(false));
        });
}

export async function fetchNewPosts(page: number, token: string, dispatch: AppDispatch): Promise<void> {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: page, size: 10 },
    };
    api.get(GET_NEW_POSTS, config)
        .then(
            (response) => {
                dispatch(setNewPosts(page, response.data));
            },
            (err) => {
                dispatch(setNewPosts(0, {}));
                console.log('Error: ', err);
            },
        )
        .finally(() => {
            dispatch(setLoaderVisibility(false));
        });
}

export async function searchPosts(searchParam: string, page: number, dispatch: AppDispatch): Promise<void> {
    api.get(SEARCH_POSTS, {
        params: {
            text: searchParam,
            page: page,
            size: 20,
        },
    })
        .then(
            (response) => {
                dispatch(setSearchPosts(page, response.data));
            },
            (err) => {
                dispatch(setSearchPosts(0, {}));
                console.log('Error: ', err);
            },
        )
        .finally(() => {
            dispatch(setLoaderVisibility(false));
        });
}

export async function fetchPostDetails(
    postId: string,
    token: string,
    dispatch: AppDispatch,
    setFunction: (post: Post) => void,
    onError: () => void,
): Promise<void> {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    api.get(GET_POST + `/${postId}`, config)
        .then(
            (response) => {
                setFunction(response.data);
            },
            (err) => {
                onError();
                console.log('Error: ', err);
            },
        )
        .finally(() => {
            dispatch(setLoaderVisibility(false));
        });
}

export async function fetchPostDetailsByTag(
    postTag: string,
    token: string,
    dispatch: AppDispatch,
    setFunction: (post: Post) => void,
    onError: () => void,
): Promise<void> {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    api.get(GET_POST_TAG + `/${postTag}`, config)
        .then(
            (response) => {
                setFunction(response.data);
            },
            (err) => {
                onError();
                console.log('Error: ', err);
            },
        )
        .finally(() => {
            dispatch(setLoaderVisibility(false));
        });
}

export async function createPost(
    createPostRequest: CreatePostRequest,
    token: string,
    dispatch: AppDispatch,
    cleanFunction: (post: Post) => void,
    onError: () => void,
) {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    api.post(CREATE_POST, createPostRequest, config)
        .then(
            (response) => {
                cleanFunction(response.data);
            },
            (err) => {
                onError();
                console.log('Error: ', err);
            },
        )
        .finally(() => {
            dispatch(setLoaderVisibility(false));
        });
}
