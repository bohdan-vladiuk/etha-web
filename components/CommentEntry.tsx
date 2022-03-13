// Dependencies
import moment from 'moment';
import React from 'react';
import { Col, Dropdown, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ContactUs, deleteComment } from '../middleware';
import _ from 'lodash';
// Components
import { Comment, ContactUsForm, User } from '../models';

// CSS
import { useAppDispatch, useAppSelector } from '../redux/store';
import { deleteCommentFromLocal } from '../redux';

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
                <Col xs={2}>
                    <Dropdown className="my-dropdown ">
                        <Dropdown.Toggle className="p-0 m-0" split={false} variant="light-dropdown">
                            <i className="fa fa-ellipsis-v"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ borderRadius: '20px', background: '#fff' }} align="right">
                            {state.userId === props.comment.userId ? (
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
