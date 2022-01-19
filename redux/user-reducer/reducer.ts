import { IUserState, UserAction } from './interfaces';
import * as types from './types';

const initialState: IUserState = {
    signed_in: false,
    user_id: undefined,
    token: '',
    name: '',
    email: '',
    agree: 0,
    disagree: 0,
    commentCount: 0,
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
        case types.SIGN_IN: {
            return {
                ...state,
                signed_in: true,
                user_id: action.id,
            };
        }
        case types.SIGN_OUT: {
            return {
                ...state,
                signed_in: false,
                user_id: '',
                token: '',
                name: '',
                email: '',
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

        case types.USER_DETAILS: {
            return {
                ...state,
                user_id: action.id,
                name: action.name,
                email: action.email,
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
