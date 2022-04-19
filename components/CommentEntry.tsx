// Dependencies
import moment from 'moment';
import React, { useState } from 'react';
import { Dropdown, Image, Button, FormControl } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ContactUs, deleteComment, postReaction, updateComment } from '../middleware';
import _ from 'lodash';
// Components
import { Comment, ContactUsForm, User, CommentRequest, CommentReactionRequest, ReactionCount } from '../models';

// CSS
import { useAppDispatch, useAppSelector } from '../redux/store';
import { deleteCommentFromLocal, setModalVisibility, setComments } from '../redux';
import { HiOutlineThumbDown, HiOutlineThumbUp } from 'react-icons/hi';
import { firebaseAnalytics } from '../auth/firebaseClient';

interface CommentEntryProps {
    comment: Comment;
}

export const CommentEntry: React.FC<CommentEntryProps> = (props: CommentEntryProps) => {
    const dispatch = useAppDispatch();
    const iconSize = '18';
    const [userReaction, setUserReaction] = useState<boolean | undefined>(props.comment.userReaction);
    const [comment, setCommentData] = useState<Comment>(props.comment);

    const state = useAppSelector((reduxState) => ({
        userId: reduxState.userReducer.user_id,
        name: reduxState.userReducer.name,
        imageUrl: reduxState.userReducer.imageUrl,
        token: reduxState.userReducer.token,
    }));

    const [edition, setEdition] = useState(false);
    const [commentText, setCommentText] = useState(comment.text || '');

    const user: User = _.isEmpty(comment.user)
        ? {
              id: state.userId,
              name: state.name,
              imageUrl: state.imageUrl,
          }
        : comment.user;
    function returnTime() {
        return moment(comment.createdAt).utc(true).fromNow();
    }

    function handleCommentUpdate(recvComment: Comment) {
        if (state.userId !== undefined && state.userId !== '' && commentText.trim().length > 0) {
            const comment: CommentRequest = {
                text: commentText,
                userId: recvComment.userId,
                id: recvComment.id,
                postId: recvComment.postId || '',
            };
            updateComment(state.token, comment, dispatch, (response) => {
                if (response) {
                    dispatch(setComments(0, response));
                    toast('Your comment has been updated');
                } else {
                    toast('There was an error while updating the comment. Please try again in some time.');
                }
            });
            setEdition(false);
        } else if (commentText.length !== 0) {
            dispatch(setModalVisibility(true));
        }
    }

    function handleKeyPress(target: React.KeyboardEvent) {
        if (target.key === 'Enter') {
            handleCommentUpdate(comment);
        }
    }

    function submitReaction(reactionValue: boolean) {
        const commentReaction: CommentReactionRequest = {
            commentId: comment.id || '',
            value: reactionValue,
        };
        postReaction(state.token, state.userId || '', commentReaction, dispatch, (reactionCount: ReactionCount) => {
            const isChange = commentReaction.value !== comment.userReaction;
            const tempComment = { ...comment };
            tempComment.reactionCount = { ...reactionCount };
            if (isChange) {
                setUserReaction(commentReaction.value);
                tempComment.userReaction = commentReaction.value;
            } else {
                setUserReaction(undefined);
                tempComment.userReaction = undefined;
            }
            setCommentData(tempComment);
            firebaseAnalytics.logEvent('comment_reaction_success', {
                userId: state.userId,
                voteValue: commentReaction.value,
                isChange: isChange,
            });
        });
    }

    return (
        <div
            className="mt-2 mb-1 w-100"
            style={{
                minHeight: '100px',
                minWidth: '210px',
                maxWidth: '515px',
                fontSize: '14px',
                wordBreak: 'break-all',
            }}
        >
            <div className="d-flex w-100 px-2">
                <Image
                    className="comment-image-container"
                    src={!_.isEmpty(user.imageUrl) ? user.imageUrl : '/user_circle.png'}
                    alt=""
                />
                <div className="px-2" style={{ flexDirection: 'column', flexGrow: '1' }}>
                    {edition ? (
                        <>
                            <h5 className="p-0 mb-1" style={{ fontStyle: 'bold !important', fontSize: '14px' }}>
                                {state.userId === comment.userId ? state.name : comment.user.name}
                            </h5>
                            <FormControl
                                className=""
                                value={commentText}
                                onKeyPress={handleKeyPress}
                                onChange={(event) => {
                                    setCommentText(event.target.value);
                                }}
                                type="text"
                                placeholder="Post a comment"
                            />
                            <div className="mt-1 d-flex justify-content-end">
                                <Button
                                    variant="danger"
                                    className="mr-2"
                                    onClick={() => {
                                        setEdition(false);
                                        setCommentText(comment.text || '');
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="default"
                                    style={{ backgroundColor: '#4824d6', borderColor: '#4824d6', color: '#fff' }}
                                    onClick={() => handleCommentUpdate(comment)}
                                >
                                    Save
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h5 className="p-0 m-0" style={{ fontStyle: 'bold !important', fontSize: '16px' }}>
                                {state.userId === comment.userId ? state.name : comment.user.name}
                            </h5>
                            <p
                                className="p-0 m-0"
                                style={{
                                    fontSize: '14px',
                                    wordWrap: 'normal',
                                    textOverflow: 'ellipsis',
                                    wordBreak: 'keep-all',
                                }}
                            >
                                {comment.text}
                            </p>
                            <div className="d-flex" style={{}}>
                                <div
                                    className="d-flex my-2 mx-1"
                                    style={{
                                        justifyContent: 'flex-start',
                                        fontSize: '10px',
                                        flexGrow: '1',
                                        alignItems: 'center',
                                    }}
                                >
                                    <span
                                        onClick={(event) => {
                                            submitReaction(true);
                                            event.stopPropagation();
                                        }}
                                    >
                                        <HiOutlineThumbUp
                                            size={iconSize}
                                            style={
                                                userReaction === true
                                                    ? {
                                                          filter: 'invert(21%) sepia(78%) saturate(4550%) hue-rotate(116deg) brightness(92%) contrast(101%)',
                                                      }
                                                    : {
                                                          filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                                      }
                                            }
                                        />
                                        <span
                                            className="mx-1"
                                            style={
                                                userReaction === false
                                                    ? {
                                                          color: 'invert(24%) sepia(94%) saturate(6418%) hue-rotate(356deg) brightness(101%) contrast(119%)',
                                                          fontSize: '9px',
                                                          fontWeight: 'bold',
                                                      }
                                                    : {
                                                          color: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                                          fontSize: '9px',
                                                      }
                                            }
                                        >
                                            {_.isEmpty(comment.reactionCount) ? '' : comment.reactionCount.like}
                                        </span>
                                    </span>
                                    <span
                                        onClick={(event) => {
                                            submitReaction(false);
                                            event.stopPropagation();
                                        }}
                                    >
                                        <HiOutlineThumbDown
                                            size={iconSize}
                                            style={
                                                userReaction === false
                                                    ? {
                                                          filter: 'invert(24%) sepia(94%) saturate(6418%) hue-rotate(356deg) brightness(101%) contrast(119%)',
                                                      }
                                                    : {
                                                          filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                                      }
                                            }
                                        />
                                        <span
                                            className="mx-1"
                                            style={
                                                userReaction === false
                                                    ? {
                                                          color: 'invert(24%) sepia(94%) saturate(6418%) hue-rotate(356deg) brightness(101%) contrast(119%)',
                                                          fontSize: '9px',
                                                      }
                                                    : {
                                                          color: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                                          fontSize: '9px',
                                                      }
                                            }
                                        >
                                            {_.isEmpty(comment.reactionCount) ? '' : comment.reactionCount.dislike}
                                        </span>
                                    </span>
                                </div>
                                <div
                                    className="d-flex"
                                    style={{
                                        justifyContent: 'flex-end',
                                        fontSize: '10px',
                                        flexGrow: '1',
                                        alignItems: 'end',
                                    }}
                                >
                                    {returnTime()}
                                </div>
                            </div>
                            {/* <div className="d-flex " style={{ justifyContent: 'flex-end', fontSize: '10px' }}>
                                {returnTime()}
                            </div> */}
                        </>
                    )}
                </div>
                <div>
                    <Dropdown className="my-dropdown ">
                        <Dropdown.Toggle className="p-0 m-0" split={false} variant="light-dropdown">
                            <i className="fa fa-ellipsis-v" style={{ position: 'relative', top: '0' }}></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ borderRadius: '20px', background: '#fff' }} align="right">
                            {state.userId === comment.userId ? (
                                <div>
                                    <Dropdown.Item
                                        as="button"
                                        onClick={() => {
                                            setEdition(true);
                                            setCommentText(comment.text || '');
                                        }}
                                    >
                                        {' '}
                                        <i className="fa fa-edit"></i> Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        as="button"
                                        onClick={() => {
                                            deleteComment(state.token, comment.id || '', dispatch, (response) => {
                                                if (response) {
                                                    dispatch(deleteCommentFromLocal(comment.id || ''));
                                                    toast('Your comment has been deleted');
                                                } else {
                                                    toast(
                                                        'There was an error while deleting the comment. Please try again in some time.',
                                                    );
                                                }
                                            });
                                        }}
                                    >
                                        {' '}
                                        <i className="fa fa-trash"></i> Delete
                                    </Dropdown.Item>
                                </div>
                            ) : (
                                <Dropdown.Item
                                    as="button"
                                    onClick={() => {
                                        const form: ContactUsForm = {
                                            email: '',
                                            name: state.name + ' ' + state.userId,
                                            message: `${state.userId} reports commentId: ${comment.id}`,
                                        };
                                        ContactUs(form, () => {
                                            toast(
                                                'The Comment has been reported. Our moderators will address your concerns at the earliest.',
                                            );
                                        });
                                    }}
                                >
                                    <i className="fa fa-info-circle"></i> Report
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <hr className="mt-1" style={{ backgroundColor: '#F7F7F7' }} />
        </div>
    );
};
