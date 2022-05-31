import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

export const Web: NextPage = () => {
    const history = useRouter();
    useEffect(() => {
        history.push('/home');
    }, [history]);
    return <></>;
};
export default Web;
