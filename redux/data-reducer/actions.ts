import { SetCommentAction, SetPostAction } from './interfaces';
import { SET_COMMENTS, SET_POSTS, SET_USER_ACTIVITY_DATA } from './types';
import { SetUserPosts, SetUserActiivityAction } from './interfaces';
import { SET_USERS } from './types';
import { DeleteCommentAction, DELETE_COMMENT } from '.';

export const setUsers = (users: object): SetUserPosts => ({
    type: SET_USERS,
    usersList: users,
});

export const setNewPosts = (page: number, recvData: object): SetPostAction => ({
    type: SET_POSTS,
    postType: 'new',
    page: page,
    postData: recvData,
});

export const setHotPosts = (page: number, recvData: object): SetPostAction => ({
    type: SET_POSTS,
    postType: 'hot',
    page: page,
    postData: recvData,
});

export const setSearchPosts = (page: number, recvData: object): SetPostAction => ({
    type: SET_POSTS,
    postType: 'search',
    page: page,
    postData: recvData,
});

export const setComments = (page: number, recvData: object): SetCommentAction => ({
    type: SET_COMMENTS,
    page: page,
    commentData: recvData,
});

export const setUserActivityData = (page: number, recvData: object): SetUserActiivityAction => ({
    type: SET_USER_ACTIVITY_DATA,
    page: page,
    userActivityData: recvData,
});

export const setUserPosts = (page: number, recvData: object): SetPostAction => ({
    type: SET_POSTS,
    postType: 'public-figure',
    page: page,
    postData: recvData,
});

export const deleteCommentFromLocal = (commentId: string): DeleteCommentAction => ({
    type: DELETE_COMMENT,
    commentId: commentId,
});
