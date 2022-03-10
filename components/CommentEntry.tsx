// Dependencies
import React from 'react';

// Components
import { Comment } from '../models';

// CSS
import { useAppSelector } from '../redux/store';

interface CommentEntryProps {
    comment: Comment;
}

export const CommentEntry: React.FC<CommentEntryProps> = (props: CommentEntryProps) => {
    const state = useAppSelector((reduxState) => ({
        userId: reduxState.userReducer.user_id,
        name: reduxState.userReducer.name,
        token: reduxState.userReducer.token,
    }));

    return (
        <>
            <div className="comment-entry-container">
                <div
                    className="d-flex"
                    style={{
                        width: '95%',
                        margin: '3px',
                        minHeight: '30px',
                        borderRadius: '25px 25px 25px 25px',
                        backgroundColor: '#F0F0F0',
                        paddingLeft: '15px',
                        paddingRight: '15px',
                        marginLeft: '5px',
                        textAlign: 'start',
                        alignItems: 'center',
                        fontSize: '14px',
                        wordBreak: 'break-all',
                    }}
                >
                    <p className="p-0 m-0">
                        {state.userId === props.comment.userId ? (
                            <span style={{ fontWeight: 'bold' }}>{state.name + ' : '}</span>
                        ) : (
                            <span style={{ fontWeight: 'bold' }}>{props.comment.user.name + ' : '}</span>
                        )}
                        {props.comment.text}
                    </p>
                </div>
            </div>
        </>
    );
};
