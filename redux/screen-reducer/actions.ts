import { SET_CONTACT_FORM } from '.';
import { ScreenAction } from './interfaces';
import { SET_LOADER, SET_MODAL, SET_SIGNIN_WELCOME, SET_SIGNUP_WELCOME, SET_POST } from './types';

export const setSignInModalVisibility = (modalVisibility: boolean): ScreenAction => ({
    type: SET_MODAL,
    isSignInModalShow: modalVisibility,
});

export const setSignInWelcome = (modalVisibility: boolean): ScreenAction => ({
    type: SET_SIGNIN_WELCOME,
    isSignInWelcomeShow: modalVisibility,
});

export const setSignUpWelcome = (modalVisibility: boolean): ScreenAction => ({
    type: SET_SIGNUP_WELCOME,
    isSignUpWelcomeShow: modalVisibility,
});

export const setLoaderVisibility = (loaderVisibility: boolean): ScreenAction => ({
    type: SET_LOADER,
    isLoading: loaderVisibility,
});

export const setContactFormVisibility = (contactFormVisibility: boolean): ScreenAction => ({
    type: SET_CONTACT_FORM,
    isContactForm: contactFormVisibility,
});

export const setSharePost = (statetmentId: string): ScreenAction => ({
    type: SET_POST,
    isSharing: true,
    sharePostId: statetmentId,
});

export const unsetSharePostId = (): ScreenAction => ({
    type: SET_POST,
    isSharing: false,
    sharePostId: '',
});
