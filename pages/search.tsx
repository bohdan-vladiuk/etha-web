import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

import ReactGA from 'react-ga';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../redux/store';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Col, Container, Row, Spinner } from 'react-bootstrap';

import { searchPosts } from '../middleware';
import { Post, User } from '../models';
import { PostCard } from '../components/PostCard';
import _ from 'lodash';
import { setUsers, setSearchPosts, setModalVisibility } from '../redux';
import { searchUsers } from '../middleware/User';
import UserCard from '../components/UserCard';
import { AppNavBar } from '../components/AppNavBar';
import SidePanelLeft from '../components/SidePanelLeft';
import SidePanelRight from '../components/SidePanelRight';
import { AppFooter } from '../components/AppFooter';
import Head from 'next/head';

const Search: NextPage = () => {
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const [didSearch, setDidSearch] = useState(false);
    const history = useRouter();
    const [searchParam, setSearchParam] = useState(
        history.query.searchParam !== undefined ? history.query.searchParam.toString() : '',
    );

    const search = history.query;
    const receivedSearchParam = history.query.searchParam !== undefined ? history.query.searchParam.toString() : '';

    const state = useAppSelector((reduxState) => ({
        signedIn: reduxState.userReducer.signed_in,
        userId: reduxState.userReducer.user_id,
        userData: reduxState.dataReducer.userData,
        postsData: reduxState.dataReducer.searchPosts,
    }));

    useEffect(() => {
        dispatch(setSearchPosts(0, {}));
        dispatch(setUsers({}));
        setSearchParam(receivedSearchParam);
    }, [receivedSearchParam, dispatch]);
    // useEffect(() => {
    //     if (!state.signedIn) {
    //         dispatch(setModalVisibility(true));
    //     }
    // }, [state.signedIn]);
    useEffect(() => {
        ReactGA.event({
            category: 'page_load',
            action: `Search Page`,
            dimension1: state.userId,
            dimension7: 'Search',
        });
    }, [state.userId]);

    useEffect(() => {
        function fetchSearchResults(searchParamRecv: any) {
            ReactGA.event({
                category: 'user_search_request',
                action: `User Search Request`,
                dimension7: searchParamRecv,
            });
            searchUsers(searchParam || '', 0, dispatch);
            searchPosts(searchParamRecv, currentPage, dispatch);
        }
        if (searchParam !== '') {
            fetchSearchResults(searchParam);
            setDidSearch(true);
            setCurrentPage(0);
        }
    }, [searchParam, currentPage, dispatch]);

    useEffect(() => {
        setSearchParam(searchParam);
    }, [searchParam]);

    useEffect(() => {
        if (didSearch) {
            searchPosts(searchParam, currentPage, dispatch);
        }
    }, [currentPage, dispatch, searchParam, didSearch]);

    useEffect(() => {
        setDidSearch(false);
    }, []);

    function fetchMoreData() {
        setCurrentPage(currentPage + 1);
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
                        <div className="d-flex w-100 pt-3 px-2" style={{}}>
                            <div className="search-container mx-auto">
                                {!_.isEmpty(state.postsData.hits) ? (
                                    <>
                                        <div className="w-100" style={{ textAlign: 'center' }}>
                                            <h4>Search Results for : {`${searchParam}`}</h4>
                                        </div>
                                        {!_.isEmpty(state.userData.hits) && (
                                            <>
                                                <h5>Politicians</h5>
                                                <div
                                                    className="mt-2 mb-3"
                                                    style={{
                                                        width: '100%',
                                                        background: 'rgba(0,0,0,.1)',
                                                        height: '0.1px',
                                                    }}
                                                />
                                                <InfiniteScroll
                                                    dataLength={
                                                        !_.isEmpty(state.userData.content)
                                                            ? Object.keys(state.userData.content).length
                                                            : 0
                                                    }
                                                    next={fetchMoreData}
                                                    hasMore={false}
                                                    loader={<></>}
                                                    initialScrollY={0}
                                                >
                                                    {!_.isEmpty(state.userData.hits) &&
                                                        state.userData.hits.map((user: User, index: number) => {
                                                            return <UserCard key={index} user={user} />;
                                                        })}
                                                </InfiniteScroll>
                                            </>
                                        )}
                                        {!_.isEmpty(state.postsData.hits) && (
                                            <>
                                                <h5 className="mt-2">Posts </h5>
                                                <div
                                                    className="mb-3"
                                                    style={{
                                                        width: '100%',
                                                        background: 'rgba(0,0,0,.1)',
                                                        height: '0.1px',
                                                    }}
                                                />
                                                <InfiniteScroll
                                                    dataLength={
                                                        !_.isEmpty(state.postsData.hits)
                                                            ? Object.keys(state.postsData.hits).length
                                                            : 0
                                                    }
                                                    loader={
                                                        <div
                                                            className="d-flex w-100"
                                                            style={{ justifyContent: 'center' }}
                                                        >
                                                            <Spinner
                                                                className="my-2"
                                                                animation="border"
                                                                role="status"
                                                                variant="secondary"
                                                            />
                                                        </div>
                                                    }
                                                    next={fetchMoreData}
                                                    hasMore={state.postsData.nbPages - 1 > currentPage}
                                                    initialScrollY={0}
                                                    className="mt-1"
                                                >
                                                    {!_.isEmpty(state.postsData.hits) &&
                                                        state.postsData.hits.map((post: Post) => {
                                                            return (
                                                                <PostCard
                                                                    key={post.id}
                                                                    post={post}
                                                                    fetchOnLoad={true}
                                                                />
                                                            );
                                                        })}
                                                </InfiniteScroll>
                                            </>
                                        )}
                                    </>
                                ) : didSearch && _.isEmpty(state.postsData.hits) && _.isEmpty(state.userData.hits) ? (
                                    <div
                                        className="search-holder-empty d-flex w-100 pt-3"
                                        style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <h1 style={{ color: '#000' }}>No Result Found</h1>
                                    </div>
                                ) : (
                                    <div
                                        className="search-holder-empty d-flex w-100"
                                        style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <h3>Searching.....</h3>
                                    </div>
                                )}
                            </div>
                        </div>
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

export default Search;
