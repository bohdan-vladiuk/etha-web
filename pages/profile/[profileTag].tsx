import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import _ from 'lodash';
import ReactGA from 'react-ga';
// Components
import { fetchUserByTag } from '../../middleware/User';
import { Post, User } from '../../models';
import { PostCard } from '../../components/PostCard';
import { fetchUserPosts } from '../../middleware';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setLoaderVisibility, setUserPosts } from '../../redux';
import { FETCH_USER_TAG } from '../../services/API';
import api from '../../services/api-helper';
// CSS
import InfiniteScroll from 'react-infinite-scroll-component';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NextPage } from 'next';
import { AppNavBar } from '../../components/AppNavBar';
import SidePanelLeft from '../../components/SidePanelLeft';
import SidePanelRight from '../../components/SidePanelRight';
import { AppFooter } from '../../components/AppFooter';

interface Props {
    preFetchUser?: User;
}

export const PoliticianPanel: NextPage<Props> = (props) => {
    const history = useRouter();
    const [user, setUser] = useState<User>(props.preFetchUser || {});
    const [percentageValue, setPercentageValue] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const state = useAppSelector((reduxState) => ({
        userId: reduxState.userReducer.user_id,
        token: reduxState.userReducer.token,
        userList: reduxState.dataReducer.userData,
        postsData: reduxState.dataReducer.userPosts,
        signedIn: reduxState.userReducer.signed_in,
    }));
    const {
        query: { profileTag },
    } = history;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (profileTag === '') {
            history.push('/');
        } else if (_.isNumber(profileTag) && !_.isEmpty(user)) {
            history.replace(`/profile/${user.tag}`);
        }
    }, [history, profileTag, user]);

    useEffect(() => {
        if (user.voteCount) setPercentageValue(user.voteCount.agree / (user.voteCount.agree + user.voteCount.disagree));
    }, [user, user.voteCount]);

    useEffect(() => {
        if (profileTag !== undefined && profileTag !== '') {
            dispatch(setLoaderVisibility(true));
            fetchUserByTag(
                profileTag?.toString() || '',
                dispatch,
                (recvUser: User) => {
                    dispatch(setLoaderVisibility(false));
                    setUser(recvUser);
                },
                () => {
                    history.push('/');
                },
            );
        }
    }, [history, dispatch, profileTag]);

    useEffect(() => {
        if (user.id) {
            refresh();
        }
    }, [user.id, state.signedIn]);

    useEffect(() => {
        if (currentPage === 0) {
            dispatch(setUserPosts(0, {}));
        }
        if (user.id !== undefined) {
            fetchUserPosts(user.id, currentPage, state.token, dispatch);
        }
    }, [currentPage, dispatch, user.id, state.token]);

    function fetchMoreData() {
        setCurrentPage(currentPage + 1);
    }

    function refresh() {
        setCurrentPage(0);
    }

    return (
        <>
            <Head>
                <title>{`${user.name}`}</title>
                <meta name="og:description" content={`${props.preFetchUser?.title}`} key="ogDesc" />
                <meta property="og:title" content={`${props.preFetchUser?.name}`} key="ogTitle" />
                <meta property="og:url" content={`https://etha.one/profile/${props.preFetchUser?.tag}`} key="ogUrl" />
                <meta property="og:image" content={`${props.preFetchUser?.imageUrl}`} key="ogImage" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Etha" />
		        <meta property="og:site" content="etha.one" />
                <meta name="twitter:site" content="@GetEtha" />
                <meta name="twitter:creator" content="@GetEtha" />
                <meta name="twitter:card" content="summary" />
                <meta property="twitter:domain" content="etha.one" />
                <meta property="twitter:url" content={`${props.preFetchUser?.name}`} />
                <meta name="twitter:title" content={`${props.preFetchUser?.title}`} />
                <meta name="twitter:description" content="Intelligent Political Discourse" />
                <meta name="twitter:image" content={`${props.preFetchUser?.imageUrl}`} />
            </Head>{' '}
            <AppNavBar />
            <Container
                style={{
                    paddingTop: '100px',
                    width: '100%',
                    paddingBottom: '120px',
                }}
            >
                <Row>
                    <Col className=" d-none d-lg-flex" lg={3}>
                        <SidePanelLeft />
                    </Col>
                    <Col lg={6} className="d-flex">
                        <div className="main-figure-container">
                            {!_.isEmpty(user) && (
                                <>
                                    <Image
                                        src={user.imageUrl}
                                        fluid
                                        alt=""
                                        style={{
                                            width: '100%',
                                            zIndex: 1,
                                            borderRadius: '25px',
                                            position: 'relative',
                                            top: 0,
                                        }}
                                    />
                                    <div
                                        style={{
                                            justifyContent: 'center',
                                            zIndex: 2,
                                            position: 'relative',
                                            top: '-4rem',
                                            marginBottom: '-4rem',
                                            background: '#E7E7F5',
                                            borderRadius: '0px 100px 0px 0px',
                                            backgroundImage: user.imageUrl,
                                        }}
                                    >
                                        <div
                                            className="pt-2 pb-2 px-3"
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <h3 className=" ml-2 mt-2" style={{ fontWeight: 'bold' }}>
                                                {user.name}
                                            </h3>
                                            <h6 className="m-0 p-0 ml-2 mr-1" style={{ textAlign: 'justify' }}>
                                                ({user.title})
                                            </h6>
                                        </div>
                                        <div
                                            className="d-flex w-100 m-0 py-4"
                                            style={{
                                                justifyContent: 'space-evenly',
                                                alignItems: 'center',
                                                background: '#fefefe',
                                                flexWrap: 'wrap',
                                                borderRadius: '0px 100px 0px 0px',
                                            }}
                                        >
                                            <div
                                                className="d-flex py-2 px-1"
                                                style={{
                                                    alignItems: 'center',
                                                    textAlign: 'center',
                                                    justifyItems: 'center',
                                                }}
                                            >
                                                <div
                                                    className="d-flex w-100"
                                                    style={{ justifyContent: 'space-between' }}
                                                >
                                                    <div
                                                        className="d-flex "
                                                        style={{
                                                            width: '100px',
                                                            alignItems: 'center',
                                                            textAlign: 'center',
                                                            justifyItems: 'center',
                                                        }}
                                                    >
                                                        <CircularProgressbar
                                                            value={percentageValue}
                                                            maxValue={1}
                                                            strokeWidth={15}
                                                            counterClockwise
                                                            styles={buildStyles({
                                                                textSize: '14px',
                                                                strokeLinecap: 'round',
                                                                textColor: 'black',
                                                                pathColor: `#66D88D`,
                                                                trailColor: `#F84545`,
                                                                pathTransitionDuration: 2,
                                                            })}
                                                        />
                                                    </div>
                                                    <div
                                                        className="px-4 py-2"
                                                        style={{
                                                            color: 'black',
                                                            textAlign: 'start',
                                                        }}
                                                    >
                                                        <h4 style={{ fontWeight: 'bolder' }}>
                                                            {user.voteCount?.agree !== undefined &&
                                                            user.voteCount?.disagree !== undefined
                                                                ? (
                                                                      (user.voteCount?.agree * 100) /
                                                                      (user.voteCount?.agree + user.voteCount?.disagree)
                                                                  ).toFixed(2) + '%'
                                                                : '...'}
                                                        </h4>
                                                        <h6 style={{ fontWeight: 'bolder' }}>Approval Rating</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                                                <div className="mx-3 px-2 py-2">
                                                    <h4 style={{ fontWeight: 'bolder' }}>
                                                        {state.postsData.totalElements !== undefined
                                                            ? state.postsData.totalElements
                                                            : '...'}
                                                    </h4>
                                                    <h6 style={{ fontWeight: 'bolder' }}>Posts</h6>
                                                </div>
                                                <div className="mx-3 px-2 py-2">
                                                    <h4 style={{ fontWeight: 'bolder' }}>
                                                        {user.voteCount?.agree !== undefined
                                                            ? user.voteCount?.agree
                                                            : '...'}
                                                    </h4>
                                                    <h6>Agrees</h6>
                                                </div>
                                                <div className="mx-3 px-2 py-2">
                                                    <h4 style={{ fontWeight: 'bolder' }}>
                                                        {user.voteCount?.disagree !== undefined
                                                            ? user.voteCount?.disagree
                                                            : '...'}
                                                    </h4>
                                                    <h6>Disagrees</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="my-1"
                                        style={{ width: '100%', background: 'rgba(0,0,0,.1)', height: '0.1px' }}
                                    />

                                    <InfiniteScroll
                                        dataLength={
                                            !_.isEmpty(state.postsData.content)
                                                ? Object.keys(state.postsData.content).length
                                                : 0
                                        }
                                        next={fetchMoreData}
                                        style={{ background: '#fefefe' }}
                                        hasMore={state.postsData.totalPages - 1 > currentPage}
                                        loader={
                                            <>
                                                <Spinner
                                                    className="my-2"
                                                    animation="border"
                                                    role="status"
                                                    variant="secondary"
                                                />
                                            </>
                                        }
                                        initialScrollY={0}
                                        refreshFunction={refresh}
                                        // pullDownToRefresh
                                        pullDownToRefreshThreshold={50}
                                        pullDownToRefreshContent={
                                            <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                                        }
                                        releaseToRefreshContent={
                                            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                                        }
                                    >
                                        {!_.isEmpty(state.postsData.content) &&
                                            state.postsData.content.map((post: Post, index: number) => {
                                                return <PostCard key={index} post={post} fetchOnLoad={false} />;
                                            })}
                                    </InfiniteScroll>
                                </>
                            )}
                        </div>{' '}
                    </Col>
                    <Col className=" d-none d-lg-flex" lg={3}>
                        <SidePanelRight />
                    </Col>
                </Row>
                <AppFooter />
            </Container>
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
