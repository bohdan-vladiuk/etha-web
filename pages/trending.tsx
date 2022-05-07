import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../redux/store';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { fetchHotPosts, fetchNewPosts } from '../middleware';
import { Post } from '../models';
import { PostCard } from '../components/PostCard';
import _ from 'lodash';
import { AppNavBar } from '../components/AppNavBar';
import SidePanelLeft from '../components/SidePanelLeft';
import SidePanelRight from '../components/SidePanelRight';
import { AppFooter } from '../components/AppFooter';
import { setModalVisibility } from '../redux';
import Head from 'next/head';

const Trending: NextPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useAppDispatch();
    const history = useRouter();
    const state = useAppSelector((reduxState) => ({
        userId: reduxState.userReducer.user_id,
        postData: reduxState.dataReducer.hotPosts,
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

    useEffect(() => {
        refresh();
    }, [state.signedIn, state.userId]);

    // useEffect(() => {
    //     if (!state.signedIn) {
    //         dispatch(setModalVisibility(true));
    //     }
    // }, [state.signedIn]);

    useEffect(() => {
        fetchHotPosts(currentPage, state.token, dispatch);
    }, [currentPage, dispatch, state.token]);

    function fetchMoreData() {
        setCurrentPage(currentPage + 1);
    }

    function refresh() {
        setCurrentPage(0);
    }

    return (
        <>
            <Head>
                <meta name="keywords" content="etha,latest politician statements,political polls" />
            </Head>
            <AppNavBar />
            <Container
                style={{
                    paddingTop: '100px',
                    width: '100%',
                }}
            >
                <Row>
                    <Col className=" d-none d-lg-flex" lg={3}>
                        <SidePanelLeft />
                    </Col>
                    <Col lg={6} className="d-flex">
                        <InfiniteScroll
                            dataLength={
                                !_.isEmpty(state.postData.content) ? Object.keys(state.postData.content).length : 0
                            }
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
                            pullDownToRefreshContent={
                                <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                            }
                            releaseToRefreshContent={
                                <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                            }
                        >
                            {!_.isEmpty(state.postData.content) &&
                                state.postData.content.map((post: Post, index: number) => {
                                    return <PostCard key={index} post={post} fetchOnLoad={false} />;
                                })}
                        </InfiniteScroll>
                    </Col>
                    <Col className=" d-none d-lg-flex" lg={3}>
                        {/* <SidePanelRight /> */}
                    </Col>
                </Row>
                <AppFooter />
            </Container>
        </>
    );
};

export default Trending;
