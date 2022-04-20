// Dependencies
import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import _ from 'lodash';

import { HiOutlineThumbUp, HiOutlineThumbDown } from 'react-icons/hi';
import { FiMessageSquare, FiShare } from 'react-icons/fi';
import { PostVoteRequest, Post, VoteCount, User } from '../models';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchPostDetails, fetchPostDetailsByTag, postVote } from '../middleware';
import { setModalVisibility, setSharePost } from '../redux';
import { CompareBar } from './CompareBar';
import { useRouter } from 'next/router';
import { firebaseAnalytics } from '../auth/firebaseClient';

interface PostCardProps {
    post: Post;
    fetchOnLoad: boolean;
}

export const PostCard: React.FC<PostCardProps> = (props: PostCardProps) => {
    const state = useAppSelector((reduxState) => ({
        userId: reduxState.userReducer.user_id,
        token: reduxState.userReducer.token,
        publicFigureList: reduxState.dataReducer.userData,
    }));

    const [isSeeMore, setSeeMore] = useState(false);
    const [post, setPostData] = useState<Post>(props.post);
    const [user, setUserData] = useState<User>(props.post.user || {});
    const [userVote, setUserVote] = useState<boolean | undefined>(props.post.userVote);
    const dispatch = useAppDispatch();
    const history = useRouter();
    const iconSize = '25';
    const pathname = history.pathname;
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
                        setUserData(recvPost.user || {});
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

    return (
        <div
            className=" m-2"
            onClick={() => {
                history.push(`/post/${post.tag}`);
            }}
            style={{ boxShadow: '1px 1px #70707030', borderRadius: '10px' }}
        >
            <div
                className="px-1"
                style={{
                    width: '100%',
                    alignItems: 'space-between',
                    flexDirection: 'row',
                    textAlign: 'center',
                }}
            >
                <div className="px-1 pt-3 text-left w-100">
                    {user !== undefined && post.voteCount !== undefined && (
                        <div
                            style={{ display: 'flex', alignItems: 'center' }}
                            onClick={(event) => {
                                if (user && !pathname.includes(`${user.tag}`)) {
                                    firebaseAnalytics.logEvent('politician_profile_click', {
                                        userId: state.userId,
                                        statementId: post.id,
                                        politicianId: post.user?.id,
                                        politicianName: post.user?.name,
                                    });
                                    history.push(`/profile/${user.tag}`);
                                }
                                event.stopPropagation();
                            }}
                        >
                            <Image className="image-container mr-2" src={user.imageUrl} alt="" width={40} height={40} />
                            <div>
                                <p className="public-figure-title">{user.name}</p>
                                <p className="public-figure-bio ">{user.title}</p>
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
                                        firebaseAnalytics.logEvent('statement_page_open_click', {
                                            userId: state.userId,
                                            statementId: post.id,
                                        });
                                        window.open(`${post.source}`, '_blank');
                                        e.stopPropagation();
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="d-flex text-left pl-3 mt-2 w-100">
                    <p style={{ fontSize: '14px' }}>
                        {isSeeMore ? (
                            `${post.text}`
                        ) : post.text !== undefined && post.text?.length <= 120 ? (
                            <>{`${post.text}`}</>
                        ) : (
                            <>
                                {`${post.text?.substr(0, 120)}...   `}
                                <span
                                    style={{
                                        fontSize: '14px',
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
                            </>
                        )}
                    </p>
                </div>
                <div className="m-0 p-0">
                    <div
                        className="d-flex pb-1 px-2 w-100 text-center"
                        style={{ justifyContent: 'end', height: '100%', flexDirection: 'column' }}
                    >
                        {post.voteCount !== undefined && post.voteCount !== null && (
                            <CompareBar votingDetails={post.voteCount} />
                        )}
                        <div
                            className="d-flex w-100 m-0 px-1 "
                            style={{ justifyContent: 'space-between', textAlign: 'center' }}
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
                            <div style={{ width: '25%', cursor: 'pointer' }}>
                                <HiOutlineThumbUp
                                    size={iconSize}
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
                                <p style={{ fontSize: '11px' }}>Agree</p>
                            </div>
                            <div
                                style={{ width: '25%', cursor: 'pointer' }}
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
                                <HiOutlineThumbDown
                                    size={iconSize}
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
                                <p style={{ fontSize: '11px' }}>Disagree</p>
                            </div>
                            <div
                                style={{ width: '25%', cursor: 'pointer', position: 'relative' }}
                                onClick={(event) => {
                                    firebaseAnalytics.logEvent('comment_click', {
                                        userId: state.userId,
                                        statementId: post.id,
                                    });
                                    history.push(`/post/${post.tag}`);
                                    event.stopPropagation();
                                }}
                            >
                                <FiMessageSquare
                                    size={iconSize}
                                    style={{
                                        filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                    }}
                                />
                                <p
                                    style={{
                                        position: 'absolute',
                                        fontSize: 12,
                                        fontWeight: 600,
                                        right: 0,
                                        left: 15,
                                        top: -5,
                                        margin: 'auto',
                                        backgroundColor: '#4924D6',
                                        color: '#fff',
                                        borderRadius: '100%',
                                        width: '15px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {post.commentCount}
                                </p>
                                <p style={{ fontSize: '11px' }}>Comment</p>
                            </div>
                            <div
                                style={{ width: '25%', cursor: 'pointer' }}
                                onClick={async (event) => {
                                    firebaseAnalytics.logEvent('share_click', {
                                        userId: state.userId,
                                        statementId: post.id,
                                        platformSelected: 'Web',
                                    });
                                    event.stopPropagation();
                                    dispatch(setSharePost(post.tag || ''));
                                }}
                            >
                                <FiShare
                                    size={iconSize}
                                    style={{
                                        filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                    }}
                                />
                                <p style={{ fontSize: '11px' }}>Share</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
