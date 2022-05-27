import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

export const Download: NextPage = () => {
    const history = useRouter();
    useEffect(() => {
        history.push('/');
    }, [history]);
    return <></>;
};
export default Download;
