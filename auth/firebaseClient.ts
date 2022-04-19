import firebaseClient from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';

/*
Copy/paste your *client-side* Firebase credentials below. 
To get these, go to the Firebase Console > open your project > Gear Icon >
Project Settings > General > Your apps. If you haven't created a web app
already, click the "</>" icon, name your app, and copy/paste the snippet.
Otherwise, go to Firebase SDK Snippet > click the "Config" radio button >
copy/paste.
*/
const CLIENT_CONFIG = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESS_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let firebaseAuth: firebaseClient.auth.Auth;
let firebaseAnalytics: firebaseClient.analytics.Analytics;

if (typeof window !== 'undefined') {
    firebaseClient.initializeApp(CLIENT_CONFIG);
    firebaseClient.auth().setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
    (window as any).firebase = firebaseClient;
    firebaseAuth = firebaseClient.auth();
    firebaseAnalytics = firebaseClient.analytics();
}

export { firebaseClient, firebaseAuth, firebaseAnalytics };
