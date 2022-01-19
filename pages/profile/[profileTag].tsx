import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { User } from '../../models';
import { FETCH_USER_TAG } from '../../services/API';
import api from '../../services/api-helper';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NextPage } from 'next';

interface Props {
    preFetchUser?: User;
}

export const PoliticianPanel: NextPage<Props> = (props) => {
    const history = useRouter();
    const [user, setUser] = useState<User>(props.preFetchUser || {});

    useEffect(() => {
        history.push('/');
    }, [history]);

    return (
        <>
            <Head>
                <title>{`${user.name}`}</title>
                <meta name="og:description" content={`${props.preFetchUser?.title}`} key="ogDesc" />
                <meta property="og:title" content={`${props.preFetchUser?.name}`} key="ogTitle" />
                <meta property="og:url" content={`https://etha.one/profile/${props.preFetchUser?.tag}`} key="ogUrl" />
                <meta property="og:image" content={`${props.preFetchUser?.imageUrl}`} key="ogImage" />
            </Head>
        </>
    );
};

PoliticianPanel.getInitialProps = async ({ query }) => {
    const profileTag = query.profileTag;
    let user = {};
    await api.get(FETCH_USER_TAG + `/${profileTag}`).then(
        (response) => {
            user = response.data;
        },
        (err) => {
            console.log('Error: ', err);
            return {};
        },
    );
    return {
        preFetchUser: user,
    };
};
export default PoliticianPanel;
