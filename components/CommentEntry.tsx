// Dependencies
import moment from 'moment';
import React, {useState} from 'react';
import { Col, Dropdown, Image, FormControl, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ContactUs, deleteComment, updateComment } from '../middleware';
import _ from 'lodash';
// Components
import { Comment, ContactUsForm, User, CommentRequest } from '../models';

// CSS
import { useAppDispatch, useAppSelector } from '../redux/store';
import { deleteCommentFromLocal, setModalVisibility, setComments } from '../redux';

interface CommentEntryProps {
    comment: Comment;
}

export const CommentEntry: React.FC<CommentEntryProps> = (props: CommentEntryProps) => {
    const dispatch = useAppDispatch();

    const state = useAppSelector((reduxState) => ({
        userId: reduxState.userReducer.user_id,
        name: reduxState.userReducer.name,
        imageUrl: reduxState.userReducer.imageUrl,
        token: reduxState.userReducer.token,
    }));

    const [edition, setEdition] = useState(false);
    const [commentText, setCommentText] = useState(props.comment.text || '')

    const user: User = _.isEmpty(props.comment.user)
        ? {
              id: state.userId,
              name: state.name,
              imageUrl: state.imageUrl,
          }
        : props.comment.user;
    function returnTime() {
        return moment(props.comment.createdAt).utc(true).fromNow();
    }

    function handleCommentUpdate() {
        if (state.userId !== undefined && state.userId !== '' && commentText.trim().length > 0) {
            const comment: CommentRequest = {
                text: commentText,
                userId: props.comment.userId,
                id: props.comment.id,
                postId: props.comment.postId || ''
            };
            updateComment(state.token, comment, dispatch, (response) => {
                if (response) {
                    dispatch(setComments(0, response));
                    toast('Your comment has been updated');
                } else {
                    toast(
                        'There was an error while updating the comment. Please try again in some time.',
                    );
                }
            });
            setEdition(false)
        } else if (commentText.length !== 0) {
            dispatch(setModalVisibility(true));
        }
    }

    function handleKeyPress(target: React.KeyboardEvent) {
        if (target.key === 'Enter') {
            handleCommentUpdate();
        }
    }
    return (
        <>
            <div
                className="d-flex mt-2 w-100"
                style={{
                    minHeight: '30px',
                    minWidth: '210px',
                    maxWidth: '515px',
                    fontSize: '14px',
                    wordBreak: 'break-all',
                }}
            >
                <Col xs={2} className="p-0 m-0">
                    <Image
                        className="comment-image-container"
                        src={!_.isEmpty(user.imageUrl) ? user.imageUrl : '/user_circle.png'}
                        alt=""
                    />
                </Col>
                { edition ? (
                     <Col xs={8} className="d-flex flex-column">
                        <h5 className="p-0 mb-1" style={{ fontStyle: 'bold !important', fontSize: '16px' }}>
                            {state.userId === props.comment.userId ? state.name : props.comment.user.name}
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
                            <Button variant="danger" className='mr-2' onClick={() => {
                                    setEdition(false)
                                    setCommentText(props.comment.text || '')
                                }}
                            >
                                cancel
                            </Button>
                            <Button
                                variant="default"
                                style={{ backgroundColor: '#4824d6', borderColor: '#4824d6', color: '#fff' }}
                                onClick={handleCommentUpdate}
                            >
                                save
                            </Button>
                        </div>
                    </Col>
                ) : (
                    <Col xs={8} className="d-flex m-0 p-0" style={{ flexGrow: '1', flexDirection: 'column' }}>
                        <h5 className="p-0 m-0" style={{ fontStyle: 'bold !important', fontSize: '16px' }}>
                            {state.userId === props.comment.userId ? state.name : props.comment.user.name}
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
                            {props.comment.text}
                        </p>
                        <div className="d-flex " style={{ justifyContent: 'flex-end' }}>
                            {returnTime()}
                        </div>
                    </Col>
                )

                }
                <Col xs={2}>
                    <Dropdown className="my-dropdown ">
                        <Dropdown.Toggle className="p-0 m-0" split={false} variant="light-dropdown">
                            <i className="fa fa-ellipsis-v"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ borderRadius: '20px', background: '#fff' }} align="right">
                            {state.userId === props.comment.userId ? (
                               <div>
                                    <Dropdown.Item
                                        as="button"
                                        onClick={() => {
                                            setEdition(true)
                                            setCommentText(props.comment.text || '')
                                        }}
                                    >
                                        {' '}
                                        <i className="fa fa-edit"></i> Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        as="button"
                                        onClick={() => {
                                            deleteComment(state.token, props.comment.id || '', dispatch, (response) => {
                                                if (response) {
                                                    dispatch(deleteCommentFromLocal(props.comment.id || ''));
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
                                            message: `${state.userId} reports commentId: ${props.comment.id}`,
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
                </Col>
            </div>
            <hr style={{ backgroundColor: '#F7F7F7' }} />
        </>
    );
};
