import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import store, { persistor, useAppDispatch, useAppSelector } from '../redux/store';
import Script from 'next/script';
import { PersistGate } from 'redux-persist/integration/react';
import { setLoaderVisibility, setModalVisibility, unsetSharePostId } from '../redux';
import { LoadingModal } from '../components/LoadingModal';
import { NavBar } from '../components/NavBar';
import { ToastContainer } from 'react-toastify';
import { ShareModal } from '../components/ShareModal';
import { SignInModal } from '../components/SignInModal';
import { AddUsernameModal } from '../components/AddUsernameModal';

function MyApp({ Component, pageProps }: AppProps) {
    const dispatch = useAppDispatch();
    const [nameModalVisibility, setNameModalVisibility] = useState(false);

    const state = useAppSelector((reduxState) => ({
        token: reduxState.userReducer.token,
        userId: reduxState.userReducer.user_id,
        userName: reduxState.userReducer.name,
        isLoading: reduxState.screenReducer.isLoading,
        isSignInModalVisible: reduxState.screenReducer.isSignInModalShow,
    }));

    useEffect(() => {
        if (state.userId !== undefined && state.userId !== '') {
            if ((state.userName === undefined || state.userName === '') && !nameModalVisibility) {
                setNameModalVisibility(true);
            }
        }
    }, [state.userId, state.userName, nameModalVisibility]);
    return (
        <div className="main-container">
            {/* <NavBar /> */}
            <Component {...pageProps} />
            <LoadingModal
                // show={true}
                show={state.isLoading !== undefined ? state.isLoading : false}
                onHide={() => {
                    dispatch(setLoaderVisibility(false));
                }}
            />
            <ShareModal
                onHide={() => {
                    dispatch(unsetSharePostId());
                }}
            />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
            />
            <SignInModal
                show={state.isSignInModalVisible !== undefined ? state.isSignInModalVisible : false}
                onHide={() => {
                    dispatch(setModalVisibility(false));
                }}
            />
            <AddUsernameModal
                show={nameModalVisibility}
                onHide={() => {
                    setNameModalVisibility(false);
                }}
            />
        </div>
    );
}

function AppWrapper({ Component, router, pageProps }: AppProps) {
    useEffect(() => {
        //Production
        if (process.env.NEXT_PUBLIC_DEPLOY_ENV === 'prod') {
            const trackingId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID; // Replace with your Google Analytics tracking ID
            ReactGA.initialize(trackingId || '');
            const firebaseConfig = {
                apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
                authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
                messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESS_SENDER_ID,
                appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
                measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
            };

            // Initialize Firebase
            const app = initializeApp(firebaseConfig);
            const analytics = getAnalytics(app);
        }
    }, []);
    if (typeof window === 'undefined') {
        return (
            <>
                <Head>
                    <title>Etha - Future of Information</title>
                    <meta
                        name="og:description"
                        content="Etha a gamified, objective discourse is needed to make democracy withstand the onslaught of media manipulation and extreme voter polarization."
                        key="ogDesc"
                    />
                    <meta property="og:title" content="Etha - Future of Information" key="ogTitle" />
                    <meta property="og:url" content={`https://etha.one/`} key="ogUrl" />
                    <meta property="og:image" content={`https://etha.one/nav_logo.jpg`} key="ogImage" />
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
                <title>Etha - Future of Information</title>
                <meta
                    name="og:description"
                    content="Etha a gamified, objective discourse is needed to make democracy withstand the onslaught of media manipulation and extreme voter polarization."
                    key="ogDesc"
                />
                <meta property="og:title" content="Etha - Future of Information" key="ogTitle" />
                <meta property="og:url" content={`https://etha.one/`} key="ogUrl" />
                <meta property="og:image" content={`https://etha.one/nav_logo.jpg`} key="ogImage" />
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
