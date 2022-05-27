import { UserAction } from './interfaces';
import * as types from './types';
import { User } from '../../models';

export const setToken = (token: string): UserAction => ({
    type: types.SET_TOKEN,
    token: token,
});

export const signIn = (user: User): UserAction => ({
    type: types.SIGN_IN,
    id: user.id,
});

export const signUp = (user: User): UserAction => ({
    type: types.SIGN_UP,
    id: user.id,
});
export const signOut = (): UserAction => ({
    type: types.SIGN_OUT,
});

export const getUserList = (): UserAction => ({
    type: types.USER_LIST,
});

export const setUserDetails = (user: User): UserAction => ({
    type: types.USER_DETAILS,
    id: user.id,
    name: user.name,
    email: user.email,
    imageUrl: user.imageUrl,
    role: user.role,
    bio: user.bio,
    emailVerified: user.emailVerified,
    title: user.title,
    tag: user.tag,
    dob: user.dob,
});

export const setFirstLoadCompleted = (): UserAction => ({
    type: types.SET_FIRST_LOAD,
    isFirstLoad: false,
});

export const setHashtags = (userHashtags: string[]): UserAction => ({
    type: types.SET_HASHTAGS,
    hashtags: userHashtags,
});
