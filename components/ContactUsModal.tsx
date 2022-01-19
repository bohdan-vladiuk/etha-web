// Dependencies
import { useEffect } from 'react';
import { ContactUs } from '../middleware';
import React, { useState } from 'react';
import { Modal, Button, FormControl } from 'react-bootstrap';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { SocialIcons } from './SocialIcons';
interface ConatctUsModalProps {
    onHide: () => void;
}

interface ContactUsForm {
    name: string;
    email: string;
    message: string;
}

export const ContactUsModal: React.FC<ConatctUsModalProps> = (props: ConatctUsModalProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isFormSubmit, setFormSubmit] = useState(false);
    const { onHide } = props;
    const dispatch = useAppDispatch();
    const state = useAppSelector((reduxState) => ({
        isContactForm: reduxState.screenReducer.isContactForm,
    }));
    useEffect(() => {
        setName('');
        setEmail('');
        setMessage('');
        setFormSubmit(false);
    }, []);

    function validateEmail(testMail: string): boolean {
        const re = /\S+@\S+\.\S+/;
        return re.test(testMail);
    }

    return (
        <Modal show={state.isContactForm} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body bsPrefix="signup-welcome-modal">
                {!isFormSubmit ? (
                    <Modal.Body style={{ display: 'flex', flexDirection: 'column' }}>
                        <div
                            className="ml-2 mt-3"
                            style={{
                                height: '25px',
                                width: '25px',
                                filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                            }}
                        >
                            <Image
                                src="/icons/back_arr.png"
                                height={25}
                                width={25}
                                alt=""
                                onClick={() => {
                                    props.onHide();
                                }}
                            />
                        </div>
                        <h1>Contact Us</h1>
                        <div className="d-flex w-100 pl-2">
                            <h6>Name</h6>
                        </div>
                        <FormControl
                            className="form-inputs"
                            placeholder="Your Name"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <div className="d-flex w-100 pl-2 pt-2">
                            <h6>Email</h6>
                        </div>
                        <FormControl
                            className="form-inputs"
                            placeholder="Your Email"
                            aria-label="email"
                            aria-describedby="basic-addon1"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <div className="d-flex w-100 pl-2 pt-2">
                            <h6>Message</h6>
                        </div>
                        <FormControl
                            className="form-inputs"
                            as="textarea"
                            placeholder="Send us a Message"
                            aria-label="message"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            aria-describedby="basic-addon1"
                        />
                        <div className="d-flex w-100 pl-2 pt-2">
                            <SocialIcons />
                        </div>
                    </Modal.Body>
                ) : (
                    <Modal.Body>
                        <div
                            className="ml-2 mt-3"
                            style={{
                                height: '25px',
                                width: '25px',
                                filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                            }}
                        >
                            <Image
                                src="/icons/back_arr.png"
                                height={25}
                                width={25}
                                alt=""
                                onClick={() => {
                                    props.onHide();
                                }}
                            />
                        </div>
                        <h1>Contact Us</h1>
                        <div className="d-flex w-100 pl-2 pt-2" style={{ textAlign: 'justify' }}>
                            <h6>Thanks for Contacting Us! We will respond to the message as soon as we can.</h6>
                        </div>
                        <div className="d-flex w-100 pl-2 pt-2" style={{ textAlign: 'justify' }}>
                            <h6>
                                In the mean time, don&apos;t foget to follow us on Social Media for all the latest news
                                on government secrecy, surveillance, and protecting the rights of journalists
                                everywhere.
                            </h6>
                        </div>
                        <SocialIcons />
                    </Modal.Body>
                )}
                <Modal.Footer>
                    <div className="d-flex w-100" style={{ justifyContent: 'center' }}>
                        {!isFormSubmit ? (
                            <Button
                                onClick={() => {
                                    if (
                                        name.length > 0 &&
                                        email.length > 0 &&
                                        message.length > 0 &&
                                        validateEmail(email)
                                    ) {
                                        const contactUsForm: ContactUsForm = {
                                            name: name,
                                            email: email,
                                            message: message,
                                        };
                                        ContactUs(contactUsForm, dispatch, () => {
                                            setName('');
                                            setMessage('');
                                            setEmail('');
                                            setFormSubmit(true);
                                        });
                                    } else {
                                        alert('Please fill the form properly');
                                    }
                                }}
                                style={{ margin: 'auto', width: '40%' }}
                                variant="submit-primary m-1"
                            >
                                <strong>Submit</strong>
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {
                                    onHide();
                                }}
                                style={{ margin: 'auto', width: '40%' }}
                                variant="submit-primary m-1"
                            >
                                <strong>Close</strong>
                            </Button>
                        )}
                    </div>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    );
};
