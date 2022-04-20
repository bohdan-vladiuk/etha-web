// Components
import {
    TOKEN_GET_USER_DETAILS,
    SIGN_IN_USER,
    SIGN_UP_USER,
    SET_USER_DETAILS,
    CONTACT_US_SUBMIT,
    FETCH_USER,
    FETCH_USER_TAG,
    SEARCH_USERS,
    UPLOAD_IMAGE,
    CHECK_USER,
    VERIFY_EMAIL,
    REQUEST_VERIFY_EMAIL,
} from '../services/API';

import { AppDispatch } from '../redux/store';
import { ContactUsForm, ImageUploadResponse, User } from '../models';
import {
    setLoaderVisibility,
    setSignInWelcome,
    setSignUpWelcome,
    setToken,
    setUserDetails,
    setUsers,
    signOut,
} from '../redux';
import api from '../services/api-helper';
import { firebaseAnalytics, firebaseClient } from '../auth/firebaseClient';

export async function getUserDetailsWithToken(
    token: string,
    dispatch: AppDispatch,
    processUserDetails: (user: User) => void,
): Promise<void> {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    api.get(TOKEN_GET_USER_DETAILS, config).then(
        (response) => {
            dispatch(setUserDetails(response.data));
            processUserDetails(response.data);
        },
        (err) => {
            dispatch(signOut());
            console.log('Error: ', err);
        },
    );
}
export async function editUserDetails(
    token: string,
    user: User,
    dispatch: AppDispatch,
    cleanFunction: () => void,
    onError: () => void,
): Promise<void> {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    api.put(SET_USER_DETAILS, user, config).then(
        (response) => {
            if (response.data !== undefined && response.data !== '') {
                dispatch(setUserDetails(user));
                cleanFunction();
            } else {
                console.log('Unable to Edit');
            }
        },
        (err) => {
            console.log('Error: ', err);
        },
    );
}
export async function checkUser(email: string, onSuccess: (provider: string) => void, onError: () => void) {
    api.get(CHECK_USER + `?email=${email}`).then(
        (response) => {
            onSuccess(response.data.provider);
        },
        () => {
            onError();
        },
    );
}

export async function signInUser(user: User, dispatch: AppDispatch, cleanFunction: () => void): Promise<void> {
    api.post(SIGN_IN_USER, user).then(
        (response) => {
            if (response.data !== undefined && response.data !== '') {
                firebaseAnalytics.logEvent('login_email_success', {
                    email: user.email,
                    userId: user.id,
                });
                dispatch(setToken(response.data.accessToken));
                dispatch(setSignInWelcome(true));

                cleanFunction();
            } else {
                firebaseAnalytics.logEvent('login_email_failed', {
                    email: user.email,
                });
                console.log('Unable to Sign In');
                alert('Unable to Sign In Please Check your credentials');
            }
        },
        (err) => {
            firebaseAnalytics.logEvent('login_email_failed', {
                email: user.email,
            });
            alert('Please check your credentials and try again');
            console.log('Error: ', err);
        },
    );
}

export async function signUpUser(user: User, dispatch: AppDispatch, cleanFunction: () => void): Promise<void> {
    api.post(SIGN_UP_USER, user).then(
        (response) => {
            if (response.data !== undefined && response.data !== '') {
                dispatch(setToken(response.data.accessToken));
                dispatch(setSignUpWelcome(true));
                firebaseAnalytics.logEvent('signup_email_success', {
                    email: user.email,
                    userId: user.id,
                });
                cleanFunction();
            } else {
                firebaseAnalytics.logEvent('signup_email_fail', {
                    email: user.email,
                });
                console.log('Unable to Sign Up');
                alert('Please check your credentials and try again');
            }
        },
        (err) => {
            firebaseAnalytics.logEvent('signup_email_fail', {
                email: user.email,
            });
            alert('Please check your credentials and try again');
            console.log('Error: ', err);
        },
    );
}

export async function signOutUser(dispatch: AppDispatch, cleanFunction: () => void): Promise<void> {
    dispatch(signOut());
    firebaseClient.auth().signOut();
    cleanFunction();
}

export async function searchUsers(searchParam: string | string[], page: number, dispatch: AppDispatch): Promise<void> {
    dispatch(setLoaderVisibility(true));
    api.get(SEARCH_USERS, {
        params: {
            text: searchParam,
            page: page,
            size: 20,
        },
    })
        .then(
            (response) => {
                dispatch(setUsers(response.data));
            },
            (err) => {
                dispatch(setUsers({}));
                console.log('Error: ', err);
            },
        )
        .finally(() => {
            dispatch(setLoaderVisibility(false));
        });
}

export async function fetchUser(
    userId: string,
    dispatch: AppDispatch,
    setFunction: (user: User) => void,
    errorHandler: () => void,
): Promise<void> {
    api.get(FETCH_USER + `/${userId}`)
        .then(
            (response) => {
                setFunction(response.data);
            },
            (err) => {
                errorHandler();
                console.log('Error: ', err);
            },
        )
        .finally(() => {
            dispatch(setLoaderVisibility(false));
        });
}

export async function fetchUserByTag(
    userTag: string,
    dispatch: AppDispatch,
    setFunction: (user: User) => void,
    errorHandler: () => void,
): Promise<void> {
    api.get(FETCH_USER_TAG + `/${userTag}`)
        .then(
            (response) => {
                setFunction(response.data);
            },
            (err) => {
                errorHandler();
                console.log('Error: ', err);
            },
        )
        .finally(() => {
            dispatch(setLoaderVisibility(false));
        });
}

export async function UploadImage(
    request: FormData,
    token: string,
    dispatch: AppDispatch,
    setFunction: (response: ImageUploadResponse) => void,
    errorHandler: () => void,
) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    dispatch(setLoaderVisibility(true));
    api.put(UPLOAD_IMAGE, request, config)
        .then(
            (response) => {
                setFunction(response.data);
            },
            (err) => {
                errorHandler();
                console.log('Error: ', err);
            },
        )
        .finally(() => {
            dispatch(setLoaderVisibility(false));
        });
}

export async function VerifyEmail(
    userId: number,
    secret: string,
    accept: boolean,
    cleanFunction: (accept: string) => void,
    errorFunction: () => void,
): Promise<void> {
    api.post(
        VERIFY_EMAIL,
        {},
        {
            params: {
                userId: userId,
                secret: secret,
                accept: accept,
            },
        },
    ).then(
        (response) => {
            cleanFunction(response.data);
        },
        (err) => {
            errorFunction();
        },
    );
}

export async function RequestVerifyEmail(
    token: string,
    dispatch: AppDispatch,
    cleanFunction: (accept: string) => void,
    errorFunction: () => void,
): Promise<void> {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    dispatch(setLoaderVisibility(true));
    api.post(REQUEST_VERIFY_EMAIL, {}, config)
        .then(
            (response) => {
                cleanFunction(response.data);
            },
            (err) => {
                errorFunction();
            },
        )
        .finally(() => dispatch(setLoaderVisibility(false)));
}
