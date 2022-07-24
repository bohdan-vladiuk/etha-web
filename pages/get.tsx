import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

export const Get: NextPage = () => {
    const history = useRouter();
    useEffect(() => {
        history.push('/');
    }, [history]);
    return <></>;
};
export default Get;
