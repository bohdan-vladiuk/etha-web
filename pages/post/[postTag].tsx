import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Head from 'next/head';
import { Post } from '../../models';
import { NextPage } from 'next';
import { GET_POST_TAG } from '../../services/API';
import { useRouter } from 'next/router';
import api from '../../services/api-helper';

interface Props {
    preFetchPost?: Post;
}

export const PostPanel: NextPage<Props> = (props) => {
    const history = useRouter();
    const [post, setPostData] = useState<Post>(props.preFetchPost || {});

    useEffect(() => {
        history.push('/');
    }, [history]);

    return (
        <>
            <Head>
                <title>{`${post.user?.name} - "${post.text?.substr(0, 60)}"`}</title>
                <meta name="og:description" content="Intelligent Political Discourse" key="ogDesc" />
                <meta property="og:title" content={`${post.user?.name} says "${post.text}"`} key="ogTitle" />
                <meta property="og:url" content={`https://etha.one/post/${post.id}`} key="ogUrl" />
                <meta property="og:image" content={post.user?.imageUrl} key="ogImage" />
            </Head>
        </>
    );
};

PostPanel.getInitialProps = async ({ query }) => {
    const postTag = query.postTag;
    let post = {};
    await api.get(GET_POST_TAG + `/${postTag}`).then(
        (response) => {
            post = response.data;
        },
        (err) => {
            console.log('Error: ', err);
            return {};
        },
    );
    return {
        preFetchPost: post,
    };
};
export default PostPanel;
