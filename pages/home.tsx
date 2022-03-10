import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../redux/store';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Col, Spinner } from 'react-bootstrap';
import { fetchNewPosts } from '../middleware';
import { Post } from '../models';
import { PostCard } from '../components/PostCard';
import _ from 'lodash';

const Home: NextPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useAppDispatch();
    const state = useAppSelector((reduxState) => ({
        userId: reduxState.userReducer.user_id,
        postData: reduxState.dataReducer.newPosts,
        token: reduxState.userReducer.token,
        signedIn: reduxState.userReducer.signed_in,
    }));
    useEffect(() => {
        ReactGA.event({
            category: 'page_load',
            action: `Home Page`,
            dimension1: state.userId,
            dimension7: 'Home',
        });
    }, [state.userId]);

    // useEffect(() => {
    //     refresh();
    // }, [state.signedIn, state.userId]);

    useEffect(() => {
        fetchNewPosts(currentPage, state.token, dispatch);
    }, [currentPage, dispatch, state.token]);

    function fetchMoreData() {
        setCurrentPage(currentPage + 1);
    }

    function refresh() {
        setCurrentPage(0);
    }

    return (
        <div
            className="d-flex"
            style={{
                paddingTop: '20px',
                width: '100%',
            }}
        >
            <InfiniteScroll
                dataLength={!_.isEmpty(state.postData.content) ? Object.keys(state.postData.content).length : 0}
                next={fetchMoreData}
                hasMore={state.postData.totalPages > currentPage}
                loader={
                    <>
                        <Spinner className="my-2" animation="border" role="status" variant="secondary" />
                    </>
                }
                initialScrollY={0}
                refreshFunction={refresh}
                pullDownToRefreshThreshold={50}
                pullDownToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>}
                releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}
            >
                {!_.isEmpty(state.postData.content) &&
                    state.postData.content.map((post: Post, index: number) => {
                        return <PostCard key={index} post={post} fetchOnLoad={false} />;
                    })}
            </InfiniteScroll>
        </div>
    );
};

export default Home;
