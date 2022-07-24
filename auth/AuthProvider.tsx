import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
import { firebaseClient } from './firebaseClient';
import { useAppDispatch } from '../redux/store';
import { setToken } from '../redux';

const AuthContext = createContext<{ user: firebaseClient.User | null }>({
    user: null,
});

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<firebaseClient.User | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            (window as any).nookies = nookies;
        }
        const initializeAuth = async () => {
            await import('firebase/auth');
            firebaseClient.auth().setPersistence(firebaseClient.auth.Auth.Persistence.LOCAL);
            return firebaseClient.auth().onIdTokenChanged(async (user) => {
                if (!user) {
                    console.log(`no token found...`);
                    setUser(null);
                    nookies.destroy(null, 'token');
                    nookies.set(null, 'token', '', { path: '/' });
                    firebaseClient.auth().signOut();
                    return;
                }
                console.log(`updating token...`);
                const token = await user.getIdToken();
                setUser(user);
                nookies.destroy(null, 'token');
                nookies.set(null, 'token', token, { path: '/' });
                dispatch(setToken(token));
            });
        };
        initializeAuth();
    }, []);

    // force refresh the token every 10 minutes
    useEffect(() => {
        const handle = setInterval(async () => {
            console.log(`refreshing token...`);
            const user = firebaseClient.auth().currentUser;
            if (user) await user.getIdToken(true);
        }, 10 * 60 * 1000);
        return () => clearInterval(handle);
    }, []);

    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};
