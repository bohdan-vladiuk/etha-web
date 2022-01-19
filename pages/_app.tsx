import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';

import { useEffect } from 'react';
import Head from 'next/head';
import store, { persistor, useAppDispatch, useAppSelector } from '../redux/store';
import Script from 'next/script';
import { PersistGate } from 'redux-persist/integration/react';
import { ContactUsModal } from '../components/ContactUsModal';
import { setContactFormVisibility, setLoaderVisibility, setSignInModalVisibility } from '../redux';
import { LoadingModal } from '../components/LoadingModal';
import { NavBar } from '../components/NavBar';

function MyApp({ Component, pageProps }: AppProps) {
    const dispatch = useAppDispatch();

    const state = useAppSelector((reduxState) => ({
        token: reduxState.userReducer.token,
        userId: reduxState.userReducer.user_id,
        userName: reduxState.userReducer.name,
        isLoading: reduxState.screenReducer.isLoading,
    }));

    return (
        <div className="main-container">
            <NavBar />
            <Component {...pageProps} />
            <ContactUsModal
                onHide={() => {
                    dispatch(setContactFormVisibility(false));
                }}
            />
            <LoadingModal
                show={state.isLoading !== undefined ? state.isLoading : false}
                onHide={() => {
                    dispatch(setLoaderVisibility(false));
                }}
            />
        </div>
    );
}

function AppWrapper({ Component, router, pageProps }: AppProps) {
    useEffect(() => {
        //Production
        if (process.env.NODE_ENV === 'production') {
            const trackingId = 'UA-190548501-1'; // Replace with your Google Analytics tracking ID
            ReactGA.initialize(trackingId);
        }
    }, []);
    if (typeof window === 'undefined') {
        return (
            <>
                <Head>
                    <title>Etha - Future Of Politics</title>
                    <meta name="og:description" content="Intelligent Political Discourse" key="ogDesc" />
                    <meta property="og:title" content="Etha - Future Of Politics" key="ogTitle" />
                    <meta property="og:url" content={`https://etha.one/`} key="ogUrl" />
                    <meta property="og:image" content={`https://etha.one/logo_square.jpg`} key="ogImage" />
                </Head>
                <Provider store={store}>
                    <MyApp Component={Component} router={router} pageProps={pageProps} />
                </Provider>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Etha - Future Of Politics</title>
                <meta name="og:description" content="Intelligent Political Discourse" key="ogDesc" />
                <meta property="og:title" content="Etha - Future Of Politics" key="ogTitle" />
                <meta property="og:url" content={`https://etha.one/`} key="ogUrl" />
                <meta property="og:image" content={`https://etha.one/logo_square.jpg`} key="ogImage" />
            </Head>
            <Script id="googleAnalytics" async src={`https://www.googletagmanager.com/gtag/js?id=UA-190548501-1`} />
            <Script
                id="googleAnalyticsDanger"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'UA-190548501-1', {
                        page_path: window.location.pathname,
                        });
                    `,
                }}
            />
            <Provider store={store}>
                <PersistGate loading={<div>Loading</div>} persistor={persistor}>
                    <MyApp Component={Component} router={router} pageProps={pageProps} />
                </PersistGate>
            </Provider>
        </>
    );
}

export default AppWrapper;
