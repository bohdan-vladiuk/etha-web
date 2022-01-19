import { IScreenState, ScreenAction } from './interfaces';
import * as types from './types';

const initialState: IScreenState = {
    isSignInModalShow: false,
    isSignInWelcomeShow: false,
    isSignUpWelcomeShow: false,
    isLoading: false,
    isSharing: false,
    sharePostId: '',
};

function ScreenReducer(state = initialState, action: ScreenAction): IScreenState {
    switch (action.type) {
        case types.SET_MODAL: {
            return {
                ...state,
                isSignInModalShow: action.isSignInModalShow,
            };
        }
        case types.SET_SIGNIN_WELCOME: {
            return {
                ...state,
                isSignInWelcomeShow: action.isSignInWelcomeShow,
            };
        }
        case types.SET_CONTACT_FORM: {
            return {
                ...state,
                isContactForm: action.isContactForm,
            };
        }
        case types.SET_SIGNUP_WELCOME: {
            return {
                ...state,
                isSignUpWelcomeShow: action.isSignUpWelcomeShow,
            };
        }

        case types.SET_LOADER: {
            return {
                ...state,
                isLoading: action.isLoading,
            };
        }
        case types.SET_POST: {
            return {
                ...state,
                isSharing: action.isSharing,
                sharePostId: action.sharePostId,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
}
export default ScreenReducer;
