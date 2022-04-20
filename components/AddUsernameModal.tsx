// Dependencies
import { AppDispatch, useAppSelector } from '../redux/store';
import { editUserDetails, signOutUser } from '../middleware';
import React, { useState } from 'react';
import { Modal, Button, FormControl } from 'react-bootstrap';
import Image from 'next/image';
// CSS
import { User } from '../models';
import { useDispatch } from 'react-redux';
import { ContactSupport } from '@mui/icons-material';
import { useRouter } from 'next/router';

interface SignUpWelcomeModalProps {
    show: boolean;
    onHide: () => void;
}

export const AddUsernameModal: React.FC<SignUpWelcomeModalProps> = (props: SignUpWelcomeModalProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const history = useRouter();
    const state = useAppSelector((reduxState) => ({
        token: reduxState.userReducer.token,
        userId: reduxState.userReducer.user_id,
        name: reduxState.userReducer.name,
        email: reduxState.userReducer.email,
        title: reduxState.userReducer.title,
        tag: reduxState.userReducer.tag,
    }));
    const [formData, setFormData] = useState({
        name: state.name,
        email: state.email,
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            name: e.target.value,
        });
    };
    return (
        <>
            <Modal show={props.show} onHide={props.onHide} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body bsPrefix="signup-welcome-modal">
                    <div style={{ width: '30%', maxWidth: '200px', minWidth: '140px', margin: '0 auto' }}>
                        <Image src="/etha_logo.svg" alt="" height={173} width={242} />
                    </div>

                    <Modal.Body style={{ flexDirection: 'column' }}>
                        <h4>Almost Done.</h4>
                        Tell Us a little about yourself to get started
                        <br />
                        <br />
                        <div className="d-flex w-100 pl-2">
                            <h6>Name</h6>
                        </div>
                        <FormControl
                            className="mb-3"
                            style={{ borderRadius: '5px' }}
                            placeholder="Username"
                            aria-label="Username"
                            value={formData.name}
                            aria-describedby="basic-addon1"
                            onChange={handleChange}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="d-flex w-100" style={{ justifyContent: 'center' }}>
                            <Button
                                onClick={() => {
                                    signOutUser(dispatch, () => {
                                        history.push('/');
                                        props.onHide();
                                    });
                                }}
                                style={{ margin: 'auto', width: '40%' }}
                                variant="light m-1"
                            >
                                <i className="fa fa-sign-out"></i>
                                <strong> Log Out</strong>
                            </Button>
                            <Button
                                onClick={() => {
                                    const user: User = {
                                        id: state.userId,
                                        name: formData.name,
                                        email: state.email,
                                        imageUrl: '',
                                        title: state.title,
                                        tag: state.tag,
                                    };
                                    editUserDetails(
                                        state.token,
                                        user,
                                        dispatch,
                                        () => props.onHide(),
                                        () => {
                                            console.log('Error');
                                        },
                                    );
                                }}
                                style={{ margin: 'auto', width: '40%' }}
                                variant="primary m-1"
                            >
                                <strong>Proceed</strong>
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    );
};
