import React, { useEffect } from 'react';
import { setToken } from '../redux';
import ReactGA from 'react-ga';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useRouter } from 'next/router';

export const OAuth2RedirectHandler: React.FC = () => {
    const dispatch = useAppDispatch();
    const history = useRouter();
    const state = useAppSelector((reduxState) => ({
        token: reduxState.userReducer.token,
    }));
    const token = history.query.token?.toString();
    const error = history.query.error?.toString();
    const platform = history.query.platform?.toString();
    const pathname = window.localStorage.getItem('redirectUrl');
    useEffect(() => {
        if (token !== undefined && token.length > 0) {
            ReactGA.event({
                category: 'login_social_success',
                action: `User Signed In Succesfully using social`,
                dimension7: platform,
            });
            dispatch(setToken(token));
            history.push('/home');
        }
    }, [state.token, token]);

    useEffect(() => {
        if (error !== undefined && error.length > 0) {
            alert(error);
            history.push('/home');
        }
    }, [error]);
    return <>Trying to Sign In</>;
};

export default OAuth2RedirectHandler;
