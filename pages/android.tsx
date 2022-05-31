import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

export const Android: NextPage = () => {
    const history = useRouter();
    useEffect(() => {
        history.push('https://play.google.com/store/apps/details?id=one.etha.app');
    }, [history]);
    return <></>;
};
export default Android;
