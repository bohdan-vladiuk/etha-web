import { firebaseClient } from '../../auth/firebaseClient';
import { IUserState, UserAction } from './interfaces';
import * as types from './types';

const initialState: IUserState = {
    signed_in: false,
    user_id: undefined,
    token: '',
    name: '',
    email: '',
    imageUrl: '',
    tag: '',
    title: '',
    bio: '',
    dob: '',
    agree: 0,
    disagree: 0,
    role: '',
    commentCount: 0,
    isFirstLoad: true,
    hashtags: [],
};

function UserReducer(state = initialState, action: UserAction): IUserState {
    switch (action.type) {
        case types.SET_TOKEN: {
            return {
                ...state,
                signed_in: true,
                token: action.token || '',
            };
        }

        case types.SIGN_OUT: {
            return {
                signed_in: false,
                user_id: '',
                token: '',
                name: '',
                email: '',
                bio: '',
                imageUrl: '',
                role: '',
                title: '',
                dob: '',
                emailVerified: false,
                tag: '',
                agree: 0,
                disagree: 0,
                commentCount: 0,
                hashtags: [],
            };
        }
        case types.SET_FIRST_LOAD: {
            return {
                ...state,
                isFirstLoad: action.isFirstLoad,
            };
        }
        case types.SIGN_UP: {
            return {
                ...state,
                signed_in: true,
                user_id: action.id,
            };
        }
        case types.USER_LIST: {
            return {
                ...state,
            };
        }
        case types.SET_HASHTAGS: {
            return {
                ...state,
                hashtags: action.hashtags,
            };
        }
        case types.USER_DETAILS: {
            return {
                ...state,
                user_id: action.id,
                name: action.name,
                email: action.email,
                bio: action.bio,
                imageUrl: action.imageUrl,
                role: action.role,
                title: action.title,
                dob: action.dob,
                emailVerified: action.emailVerified,
                tag: action.tag,
                agree: action.agree,
                disagree: action.disagree,
                commentCount: action.commentCount,
            };
        }

        default: {
            return state;
        }
    }
}
export default UserReducer;
