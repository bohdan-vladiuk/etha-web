import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Button, Image, FormControl, Container, Row, Col, Spinner } from 'react-bootstrap';

import Head from 'next/head';
import { Comment, CommentRequest, Post, PostVoteRequest, VoteCount } from '../../models';
import { NextPage } from 'next';
import { GET_POST_TAG } from '../../services/API';
import { useRouter } from 'next/router';
import api from '../../services/api-helper';
import style from '../../styles/[postTag].module.css';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setComments, setModalVisibility, setSharePost } from '../../redux';
import { fetchCommentList, fetchPostDetailsByTag, postComment, postVote } from '../../middleware';
import { CommentEntry } from '../../components/CommentEntry';
import { AppNavBar } from '../../components/AppNavBar';
import SidePanelLeft from '../../components/SidePanelLeft';
import SidePanelRight from '../../components/SidePanelRight';
import { CompareBar } from '../../components/CompareBar';
import { AppFooter } from '../../components/AppFooter';
import { firebaseAnalytics } from '../../auth/firebaseClient';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
    preFetchPost?: Post;
}

export const PostPanel: NextPage<Props> = (props) => {
    const [userVote, setUserVote] = useState<boolean | undefined>();
    const [post, setPostData] = useState<Post>(props.preFetchPost || {});

    const [commentPost, setCommentPost] = useState('');
    const [commentPage, setCommentPage] = useState(0);
    const state = useAppSelector((reduxState) => ({
        userId: reduxState.userReducer.user_id,
        token: reduxState.userReducer.token,
        commentData: reduxState.dataReducer.commentData,
        signedIn: reduxState.userReducer.signed_in,
    }));

    const dispatch = useAppDispatch();
    const history = useRouter();
    // const params = useParams<RouteParams>();
    const {
        query: { postTag },
    } = history;

    useEffect(() => {
        if (!_.isEmpty(state.commentData)) {
            dispatch(setComments(0, {}));
        }
    }, [dispatch, postTag]);

    useEffect(() => {
        if (postTag === '') {
            history.push('/');
        } else if (postTag != undefined && _.isNumber(postTag.toString()) && !_.isEmpty(post)) {
            history.replace(`/post/${post.tag}`);
        }
    }, [post]);

    useEffect(() => {
        if (postTag !== undefined && postTag !== '') {
            fetchPostDetailsByTag(
                postTag?.toString() || '',
                state.token,
                dispatch,
                (recvPost: Post) => {
                    setPostData(recvPost);
                    if (recvPost.userVote !== undefined) {
                        setUserVote(recvPost.userVote);
                    }
                },
                () => {
                    console.log('Invalid Statemnent ID');
                    history.push('/');
                },
            );
        }
    }, [dispatch, postTag, state.token, state.signedIn, history]);

    useEffect(() => {
        fetchCommentList(post.id?.toString() || '', state.token, commentPage, 5, dispatch);
    }, [commentPage, dispatch, post]);

    function refresh() {
        setCommentPage(0);
    }

    function fetchMoreComments() {
        setCommentPage(commentPage + 1);
    }

    function handleKeyPress(target: React.KeyboardEvent) {
        if (target.key === 'Enter') {
            handleCommentPost();
        }
    }
    function submitVote(voteValue: boolean) {
        if (state.userId === undefined || state.userId === '') {
            dispatch(setModalVisibility(true));
        } else {
            const vote: PostVoteRequest = {
                postId: post.id || '',
                value: voteValue,
            };
            postVote(state.token, state.userId, vote, dispatch, (voteCount: VoteCount) => {
                const isChange = vote.value !== post.userVote;
                const tempPost = { ...post };
                tempPost.voteCount = voteCount;

                if (isChange) {
                    setUserVote(vote.value);
                    tempPost.userVote = vote.value;
                } else {
                    setUserVote(undefined);
                    tempPost.userVote = undefined;
                }
                setPostData(tempPost);
                firebaseAnalytics.logEvent('vote_click_statement_card', {
                    userId: state.userId,
                    voteValue: vote.value,
                    isChange: isChange,
                });
            });
        }
    }

    function handleCommentPost() {
        firebaseAnalytics.logEvent('post_comment_click', {
            userId: state.userId,
            statementId: post.id,
            commentText: commentPost,
        });
        if (state.userId !== undefined && state.userId !== '' && commentPost.trim().length > 0) {
            const comment: CommentRequest = {
                text: commentPost,
                postId: post.id?.toString() || '',
            };
            postComment(state.token, state.userId, comment, dispatch, () => {
                setCommentPage(0);
            });
            setCommentPost('');
        } else if (commentPost.length !== 0) {
            dispatch(setModalVisibility(true));
        }
    }

    return (
        <>
            <Head>
                <title>{`${post.user?.name} - "${post.text?.substr(0, 60)}"`}</title>
                <meta name="og:description" content="Intelligent Political Discourse" key="ogDesc" />
                <meta property="og:title" content={`${post.user?.name} says "${post.text}"`} key="ogTitle" />
                <meta property="og:url" content={`https://etha.one/post/${post.id}`} key="ogUrl" />
                <meta property="og:image" content={post.user?.imageUrl} key="ogImage" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Etha" />
                <meta property="og:site" content="etha.one" />
                <meta name="twitter:site" content="@GetEtha" />
                <meta name="twitter:creator" content="@GetEtha" />
                <meta name="twitter:card" content="summary" />
                <meta property="twitter:domain" content="etha.one" />
                <meta property="twitter:url" content={`https://etha.one/post/${post.id}`} />
                <meta name="twitter:title" content={`${post.user?.name} says "${post.text}"`} />
                <meta name="twitter:description" content="Intelligent Political Discourse" />
                <meta name="twitter:image" content={post.user?.imageUrl} />
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
                        <div className={style.main_post_container}>
                            {!_.isEmpty(post) && !_.isEmpty(post.user) && post.user !== undefined && (
                                <div className={`${style.post_container} pt-1`}>
                                    <div style={{ backgroundColor: '#ffffff', borderRadius: '25px' }}>
                                        <div
                                            className="d-flex w-100 py-2"
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <Image
                                                className="image-container"
                                                src={post.user.imageUrl}
                                                alt=""
                                                style={{
                                                    width: '53px',
                                                    height: '53px',
                                                }}
                                                onClick={(event) => {
                                                    if (post.user) {
                                                        firebaseAnalytics.logEvent('politician_profile_click', {
                                                            userId: state.userId,
                                                            statementId: post.id,
                                                            politicianId: post.user?.id,
                                                            politicianName: post.user?.name,
                                                        });
                                                        history.push(`/profile/${post.user.tag}`);
                                                    }
                                                    event.stopPropagation();
                                                }}
                                            />

                                            <div
                                                className="d-flex h-100 ml-3"
                                                style={{
                                                    color: 'black',
                                                    height: '100%',
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                }}
                                                onClick={(event) => {
                                                    if (post.user) {
                                                        firebaseAnalytics.logEvent('politician_profile_click', {
                                                            userId: state.userId,
                                                            statementId: post.id,
                                                            politicianId: post.user?.id,
                                                            politicianName: post.user?.name,
                                                        });
                                                        history.push(`/profile/${post.user.tag}`);
                                                    }
                                                    event.stopPropagation();
                                                }}
                                            >
                                                <div className="w-100">
                                                    <div className="public-figure-title m-auto">{post.user.name}</div>
                                                    <div className="public-figure-bio m-auto">{post.user.title}</div>
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flex: 1,
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-end',
                                                    paddingRight: '20px',
                                                }}
                                            >
                                                <i
                                                    className="fa fa-info-circle p-2"
                                                    style={{ color: '#707070', cursor: 'pointer' }}
                                                    onClick={(e) => {
                                                        window.open(`${post.source}`, '_blank');
                                                        e.stopPropagation();
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex w-100" style={{ justifyContent: 'center' }}>
                                            <div
                                                className="my-1"
                                                style={{
                                                    width: '90%',
                                                    background: 'rgba(0,0,0,.1)',
                                                    height: '0.1px',
                                                }}
                                            />
                                        </div>
                                        <p
                                            style={{
                                                fontSize: '14x',
                                                fontWeight: 400,
                                                color: 'black',
                                                textAlign: 'justify',
                                                cursor: 'pointer',
                                            }}
                                            className="mt-2 px-3"
                                            onClick={(event) => {
                                                history.push(`/post/${post.tag}`);
                                            }}
                                        >
                                            {'"' + post.text + '" '}
                                            <a
                                                href={post.source}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{ color: '#fff', fontSize: '14px' }}
                                            >
                                                <Image
                                                    width="15px"
                                                    height="15px"
                                                    className=""
                                                    src="/info_icon.png"
                                                    alt=""
                                                />
                                            </a>
                                        </p>
                                        {post.voteCount !== undefined && post.voteCount !== null && (
                                            <CompareBar votingDetails={post.voteCount} />
                                        )}
                                        <div className="card-bottom-container d-flex w-100 text-center m-0 p-0 pl-3 pb-2">
                                            <Button
                                                variant="lighter p-2 pr-3"
                                                onClick={(event) => {
                                                    firebaseAnalytics.logEvent('vote_click_statement_card', {
                                                        userId: state.userId,
                                                        voteValue: true,
                                                        isChange: true,
                                                    });
                                                    submitVote(true);
                                                    event.stopPropagation();
                                                }}
                                            >
                                                <Image
                                                    src="/icons/agree.png"
                                                    height="30px"
                                                    alt=""
                                                    style={
                                                        userVote === true
                                                            ? {
                                                                  filter: 'invert(21%) sepia(78%) saturate(4550%) hue-rotate(116deg) brightness(92%) contrast(101%)',
                                                              }
                                                            : {
                                                                  filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                                              }
                                                    }
                                                />
                                            </Button>
                                            <Button
                                                variant="lighter p-2 px-3"
                                                onClick={(event) => {
                                                    firebaseAnalytics.logEvent('vote_click_statement_card', {
                                                        userId: state.userId,
                                                        voteValue: false,
                                                        isChange: true,
                                                    });
                                                    submitVote(false);
                                                    event.stopPropagation();
                                                }}
                                            >
                                                <Image
                                                    src="/icons/disagree.png"
                                                    height="30px"
                                                    alt=""
                                                    style={
                                                        userVote === false
                                                            ? {
                                                                  filter: 'invert(24%) sepia(94%) saturate(6418%) hue-rotate(356deg) brightness(101%) contrast(119%)',
                                                              }
                                                            : {
                                                                  filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                                              }
                                                    }
                                                />
                                            </Button>
                                            <a id="comment" href="#comment">
                                                <Button variant="lighter p-2 px-3" onClick={(event) => {}}>
                                                    <Image
                                                        alt=""
                                                        src="/icons/comment.png"
                                                        height="30px"
                                                        style={{
                                                            filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                                        }}
                                                    />
                                                </Button>
                                            </a>
                                            <Button
                                                variant="lighter p-2 pl-3"
                                                onClick={(event) => {
                                                    firebaseAnalytics.logEvent('share_click', {
                                                        userId: state.userId,
                                                        statementId: post.id,
                                                        platformSelected: 'Web',
                                                    });
                                                    dispatch(setSharePost(post.tag || ''));
                                                    event.stopPropagation();
                                                }}
                                            >
                                                <Image
                                                    alt=""
                                                    src="/icons/share_o.png"
                                                    height="30px"
                                                    style={{
                                                        filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                                    }}
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="mt-3" style={{ backgroundColor: '#ffffff', borderRadius: '0px' }}>
                                        <div className={style.comment_input_container_large}>
                                            <FormControl
                                                className={style.comment_input}
                                                value={commentPost}
                                                onKeyPress={handleKeyPress}
                                                onChange={(event) => {
                                                    setCommentPost(event.target.value);
                                                }}
                                                type="text"
                                                placeholder="Post a comment"
                                            />
                                            <Button
                                                variant="share-comment"
                                                title="Comment"
                                                type="submit"
                                                onClick={handleCommentPost}
                                            >
                                                <i className="fas fa-paper-plane"></i>
                                            </Button>
                                        </div>

                                        <div
                                            className={`${style.comments_container} mt-3`}
                                            style={{ paddingBottom: '20px' }}
                                        >
                                            {/* <div className="comments">
                                                {!_.isEmpty(state.commentData.content) ? (
                                                    state.commentData.content.map((comment: Comment, index: number) => {
                                                        return <CommentEntry key={comment.id} comment={comment} />;
                                                    })
                                                ) : (
                                                    <div
                                                        className="d-flex w-100"
                                                        style={{ justifyContent: 'center', textAlign: 'center' }}
                                                    >
                                                        <h4>No Comments Yet!! Be the first one to Comment.</h4>
                                                    </div>
                                                )}
                                            </div>
                                            {!_.isEmpty(state.commentData) &&
                                            Object.keys(state.commentData.content).length > 0 &&
                                            state.commentData.totalPages - 1 > commentPage ? (
                                                <div className={`${style.comments_container} p-0`}>
                                                    <Button variant="link" type="button" onClick={fetchMoreComments}>
                                                        &nbsp;&nbsp;Load More Comments
                                                    </Button>
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                             */}
                                            <div className="d-flex w-100" style={{ justifyContent: 'center' }}>
                                                <InfiniteScroll
                                                    style={{
                                                        width: '100vw',
                                                        justifyContent: 'center',
                                                        maxWidth: '515px',
                                                        paddingBottom: '100px',
                                                        height: '100%',
                                                    }}
                                                    dataLength={
                                                        !_.isEmpty(state.commentData.content)
                                                            ? Object.keys(state.commentData.content).length
                                                            : 0
                                                    }
                                                    next={fetchMoreComments}
                                                    hasMore={state.commentData.totalPages > commentPage}
                                                    loader={
                                                        <div
                                                            className="d-flex w-100"
                                                            style={{ justifyContent: 'center' }}
                                                        >
                                                            <Spinner
                                                                animation="border"
                                                                role="status"
                                                                variant="secondary"
                                                            />
                                                        </div>
                                                    }
                                                    initialScrollY={0}
                                                    pullDownToRefresh
                                                    refreshFunction={refresh}
                                                    pullDownToRefreshThreshold={50}
                                                    pullDownToRefreshContent={
                                                        <h3 style={{ textAlign: 'center' }}>
                                                            &#8595; Pull down to refresh
                                                        </h3>
                                                    }
                                                    releaseToRefreshContent={
                                                        <h3 style={{ textAlign: 'center' }}>
                                                            &#8593; Release to refresh
                                                        </h3>
                                                    }
                                                >
                                                    {!_.isEmpty(state.commentData.content) &&
                                                        state.commentData.content.map((comment: Comment) => {
                                                            return <CommentEntry key={comment.id} comment={comment} />;
                                                        })}
                                                </InfiniteScroll>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>{' '}
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
