import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

export const Android: NextPage = () => {
    const history = useRouter();
    useEffect(() => {
        history.push('https://apps.apple.com/me/app/etha/id1588384989');
    }, [history]);
    return <></>;
};
export default Android;
