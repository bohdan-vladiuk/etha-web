// Dependencies
import React, { useEffect, useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import Image from 'next/image';
import _ from 'lodash';
import ReactGA from 'react-ga';

// Components

// CSS
import { CompareSmiley } from './CompareSmiley';
import { PostVoteRequest, Post, VoteCount } from '../models';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useRouter } from 'next/router';
import { fetchPostDetails, postVote } from '../middleware';
import { setModalVisibility, setSharePost } from '../redux';
import { CompareBar } from './CompareBar';
import { ComparePie } from './ComparePie';
import style from '../styles/PostCard.module.css';

interface PostCardProps {
    post: Post;
    fetchOnLoad: boolean;
}

export const PostCard: React.FC<PostCardProps> = (props: PostCardProps) => {
    const state = useAppSelector((reduxState) => ({
        userId: reduxState.userReducer.user_id,
        token: reduxState.userReducer.token,
        usersList: reduxState.dataReducer.userData,
    }));

    const [isSeeMore, setSeeMore] = useState(false);
    const [post, setPostData] = useState<Post>(props.post);
    const [userVote, setUserVote] = useState<boolean | undefined>(props.post.userVote);
    const dispatch = useAppDispatch();
    const history = useRouter();

    useEffect(() => {
        if (_.isEmpty(state.token)) {
            setUserVote(undefined);
        } else {
            setUserVote(post.userVote);
        }
    }, [state.token, post.userVote]);

    useEffect(() => {
        if (props.fetchOnLoad) {
            fetchPostDetails(
                post.id || '',
                state.token,
                dispatch,
                (recvPost: Post) => {
                    setPostData(recvPost);
                    if (recvPost.userVote !== undefined) {
                        setUserVote(recvPost.userVote);
                    }
                },
                () => {
                    console.log('Error while fetching post');
                },
            );
        }
    }, [state.userId, dispatch, props.fetchOnLoad, post.id, state.token]);

    function submitVote(voteValue: boolean) {
        if (state.userId === undefined || state.userId === '') {
            dispatch(setModalVisibility(true));
        } else {
            ReactGA.event({
                category: 'vote_click_post_card',
                action: `User Clicked Vote Button`,
                dimension1: state.userId,
                dimension2: post.id,
                dimension7: voteValue ? 'true' : 'false',
                dimension8: userVote !== undefined ? 'false' : 'true',
            });
            const vote: PostVoteRequest = {
                postId: post.id || '',
                value: voteValue,
            };
            postVote(state.token, vote, dispatch, (voteCount: VoteCount) => {
                ReactGA.event({
                    category: 'vote_submit_success',
                    action: `User Vote Submitted`,
                    dimension1: state.userId,
                    dimension2: post.id,
                    dimension7: voteValue ? 'true' : 'false',
                    dimension8: userVote !== undefined ? 'false' : 'true',
                });
                const tempPost = { ...post };
                tempPost.voteCount = voteCount;
                setPostData(tempPost);
                setUserVote(vote.value);
            });
        }
    }

    return (
        <div
            className={style.post_card_background}
            onClick={() => {
                ReactGA.event({
                    category: 'post_page_open_click',
                    action: `User clicked on Post Card`,
                    dimension1: state.userId,
                    dimension2: post.id,
                });
                history.push(`/post/${post.tag}`);
            }}
        >
            <div
                className="d-md-flex px-1"
                style={{
                    width: '100%',
                    alignItems: 'space-between',
                    flexDirection: 'row',
                    textAlign: 'center',
                }}
            >
                <Col md={8} className="px-2 pb-1">
                    {post.user !== undefined && post.voteCount !== undefined && (
                        <>
                            <div className="d-flex w-100 m-auto py-2">
                                <div
                                    className="d-none d-md-flex"
                                    style={{
                                        height: '63px',
                                        width: '63px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <Image
                                        className="image-container "
                                        src={post.user.imageUrl || ''}
                                        alt=""
                                        width={63}
                                        height={63}
                                        objectFit="cover"
                                        onClick={(event) => {
                                            if (post.user) {
                                                ReactGA.event({
                                                    category: 'politician_profile_click_page',
                                                    action: `User clicked on Politician Page`,
                                                    dimension1: state.userId,
                                                    dimension2: post.id,
                                                    dimension4: post.userId,
                                                });
                                                history.push(`/profile/${post.user.tag}`);
                                            }
                                            event.stopPropagation();
                                        }}
                                    />
                                </div>
                                <div className="d-sm-flex d-md-none mt-2">
                                    <Image
                                        className="image-container"
                                        src={post.user.imageUrl || ''}
                                        alt=""
                                        width={50}
                                        height={50}
                                        onClick={(event) => {
                                            if (post.user) {
                                                ReactGA.event({
                                                    category: 'politician_profile_click_page',
                                                    action: `User clicked on Politician Page`,
                                                    dimension1: state.userId,
                                                    dimension2: post.id,
                                                    dimension4: post.userId,
                                                });
                                                history.push(`/profile/${post.user.tag}`);
                                            }
                                            event.stopPropagation();
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        flex: 1,
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div
                                        className="d-flex w-100 h-100 ml-3 mt-2"
                                        style={{
                                            color: 'black',
                                            height: '100%',
                                            alignItems: 'center',
                                            textAlign: 'start',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <div className="w-100">
                                            <div
                                                className="public-figure-title"
                                                onClick={(event) => {
                                                    if (post.user) {
                                                        ReactGA.event({
                                                            category: 'politician_profile_click_page',
                                                            action: `User clicked on Politician Page`,
                                                            dimension1: state.userId,
                                                            dimension2: post.id,
                                                            dimension4: post.userId,
                                                        });
                                                        history.push(`/profile/${post.user.tag}`);
                                                    }
                                                    event.stopPropagation();
                                                }}
                                            >
                                                {post.user.name}
                                            </div>
                                            <div
                                                className="public-figure-bio "
                                                onClick={(event) => {
                                                    if (post.user) {
                                                        ReactGA.event({
                                                            category: 'politician_profile_click_page',
                                                            action: `User clicked on Politician Page`,
                                                            dimension1: state.userId,
                                                            dimension2: post.id,
                                                            dimension4: post.userId,
                                                        });
                                                        history.push(`/profile/${post.user.tag}`);
                                                    }
                                                    event.stopPropagation();
                                                }}
                                            >
                                                {post.user.title}
                                            </div>
                                            <p
                                                className="d-none d-md-block mb-0 py-1"
                                                style={{
                                                    fontSize: '18px',
                                                    color: 'black',
                                                    textAlign: 'justify',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                {isSeeMore ? (
                                                    `"${post.text}"`
                                                ) : post.text !== undefined && post.text?.length <= 120 ? (
                                                    <>{`"${post.text}"`}</>
                                                ) : (
                                                    <>
                                                        {`"${post.text?.substr(0, 120)}...   `}
                                                        <span
                                                            style={{
                                                                fontSize: '16px',
                                                                fontWeight: 'bold',
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={(event) => {
                                                                setSeeMore(true);
                                                                event.stopPropagation();
                                                            }}
                                                        >
                                                            See More
                                                        </span>
                                                        {'   '}
                                                    </>
                                                )}

                                                <a
                                                    href={post.source}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    style={{ color: '#fff', fontSize: '14px' }}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                    }}
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

                                            <div className="card-bottom-container  d-none d-md-flex w-100  m-0 p-0 pt-2">
                                                <Button
                                                    variant="lighter p-0 px-2"
                                                    onClick={(event) => {
                                                        submitVote(true);
                                                        event.stopPropagation();
                                                    }}
                                                    style={
                                                        userVote === true
                                                            ? {
                                                                  filter: 'invert(21%) sepia(78%) saturate(4550%) hue-rotate(116deg) brightness(92%) contrast(101%)',
                                                              }
                                                            : {
                                                                  filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                                              }
                                                    }
                                                >
                                                    <Image src="/icons/agree.png" height={25} width={25} alt="" />
                                                </Button>
                                                <Button
                                                    variant="lighter p-0 px-2"
                                                    onClick={(event) => {
                                                        submitVote(false);
                                                        event.stopPropagation();
                                                    }}
                                                    style={
                                                        userVote === false
                                                            ? {
                                                                  filter: 'invert(24%) sepia(94%) saturate(6418%) hue-rotate(356deg) brightness(101%) contrast(119%)',
                                                              }
                                                            : {
                                                                  filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                                              }
                                                    }
                                                >
                                                    <Image src="/icons/disagree.png" height={25} width={25} alt="" />
                                                </Button>
                                                <Button
                                                    variant="lighter p-0 px-2"
                                                    onClick={(event) => {
                                                        ReactGA.event({
                                                            category: 'comment_click',
                                                            action: `User clicked on the comment button`,
                                                            dimension1: state.userId,
                                                            dimension2: post.id,
                                                        });
                                                        history.push(`/post/${post.tag}`);
                                                        event.stopPropagation();
                                                    }}
                                                    style={{
                                                        filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                                    }}
                                                >
                                                    <Image src="/icons/comment.png" height={25} width={25} alt="" />
                                                </Button>
                                                <Button
                                                    variant="lighter p-0 px-2"
                                                    onClick={(event) => {
                                                        ReactGA.event({
                                                            category: 'share_pop_open_click',
                                                            action: `User clicked on the share button`,
                                                            dimension1: state.userId,
                                                            dimension2: post.tag,
                                                        });
                                                        dispatch(setSharePost(post.tag || ''));
                                                        event.stopPropagation();
                                                    }}
                                                    style={{
                                                        filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                                    }}
                                                >
                                                    <Image src="/icons/share_o.png" height={25} width={25} alt="" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </Col>
                <p
                    className=" d-block d-md-none mb-0 px-3 py-1"
                    style={{
                        fontSize: '18px',
                        color: 'black',
                        textAlign: 'justify',
                        cursor: 'pointer',
                    }}
                >
                    {isSeeMore ? (
                        `"${post.text}"`
                    ) : post.text !== undefined && post.text?.length <= 120 ? (
                        <>{`"${post.text}"`}</>
                    ) : (
                        <>
                            {`"${post.text?.substr(0, 120)}...   `}
                            <span
                                style={{ fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
                                onClick={(event) => {
                                    setSeeMore(true);
                                    event.stopPropagation();
                                }}
                            >
                                See More
                            </span>
                            {'   '}
                        </>
                    )}

                    <a
                        href={post.source}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#fff', fontSize: '14px' }}
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                    >
                        <Image width="15px" height="15px" className="" src="/info_icon.png" alt="" />
                    </a>
                </p>

                <Col className="m-0 p-0" md={4}>
                    <div
                        className="d-flex pb-4 px-2 w-100 text-center"
                        style={{ justifyContent: 'end', height: '100%', flexDirection: 'column' }}
                    >
                        <div className="d-none d-md-flex">
                            {post.voteCount !== undefined && post.voteCount !== null && (
                                <ComparePie votingDetails={post.voteCount} />
                            )}
                        </div>
                        <div className="d-sm-flex d-md-none">
                            {post.voteCount !== undefined && post.voteCount !== null && (
                                <CompareBar votingDetails={post.voteCount} />
                            )}
                        </div>
                        <div
                            className=" d-flex d-md-none "
                            style={{ width: '100%', background: 'rgba(0,0,0,.1)', height: '0.1px' }}
                        />
                        <div
                            className="card-bottom-container d-flex d-md-none w-100  m-0 p-0 mt-3"
                            style={{ justifyContent: 'space-evenly' }}
                        >
                            <Button
                                variant="lighter p-0 px-2"
                                onClick={(event) => {
                                    submitVote(true);
                                    event.stopPropagation();
                                }}
                                style={
                                    userVote === true
                                        ? {
                                              filter: 'invert(21%) sepia(78%) saturate(4550%) hue-rotate(116deg) brightness(92%) contrast(101%)',
                                          }
                                        : {
                                              filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                          }
                                }
                            >
                                <Image src="/icons/agree.png" height={25} width={25} alt="" />
                            </Button>
                            <Button
                                variant="lighter p-0 px-2"
                                onClick={(event) => {
                                    submitVote(false);
                                    event.stopPropagation();
                                }}
                                style={
                                    userVote === false
                                        ? {
                                              filter: 'invert(24%) sepia(94%) saturate(6418%) hue-rotate(356deg) brightness(101%) contrast(119%)',
                                          }
                                        : {
                                              filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                          }
                                }
                            >
                                <Image src="/icons/disagree.png" height={25} width={25} alt="" />
                            </Button>
                            <Button
                                variant="lighter p-0 px-2"
                                onClick={(event) => {
                                    ReactGA.event({
                                        category: 'comment_click',
                                        action: `User clicked on the comment button`,
                                        dimension1: state.userId,
                                        dimension2: post.id,
                                    });
                                    history.push(`/post/${post.tag}`);
                                    event.stopPropagation();
                                }}
                                style={{
                                    filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                }}
                            >
                                <Image src="/icons/comment.png" height={25} width={25} alt="" />
                            </Button>
                            <Button
                                variant="lighter p-0 px-2"
                                onClick={(event) => {
                                    ReactGA.event({
                                        category: 'share_pop_open_click',
                                        action: `User clicked on the share button`,
                                        dimension1: state.userId,
                                        dimension2: post.tag,
                                    });
                                    dispatch(setSharePost(post.tag || ''));
                                    event.stopPropagation();
                                }}
                                style={{
                                    filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                }}
                            >
                                <Image src="/icons/share_o.png" height={25} width={25} alt="" />
                            </Button>
                        </div>
                    </div>
                </Col>
            </div>
        </div>
    );
};
