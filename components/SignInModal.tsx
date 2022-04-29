// Dependencies
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Image, FormControl, InputGroup, FormCheck } from 'react-bootstrap';
import ReactGA from 'react-ga';
import { useDispatch } from 'react-redux';

// Components
import { checkUser, signInUser, signUpUser } from '../middleware';
import { User } from '../models';
import { AppDispatch } from '../redux/store';
import { APPLE_AUTH_URL, FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from '../services/API';
import { toast } from 'react-toastify';
import { TextField } from '@material-ui/core';
import { firebaseAnalytics, firebaseClient } from '../auth/firebaseClient';

interface SignInModalProps {
    show: boolean;
    onHide: () => void;
}

type SignInScreenState = 'MAIN' | 'SIGNIN' | 'SIGNUP';

export const SignInModal: React.FC<SignInModalProps> = (props: SignInModalProps) => {
    const googleProvider = new firebaseClient.auth.GoogleAuthProvider();
    var appleProvider = new firebaseClient.auth.OAuthProvider('apple.com');

    const dispatch = useDispatch<AppDispatch>();
    const { show, onHide } = props;
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        phone: '',
        tag: '',
        dob: '',
        email: '',
    });
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [localModalState, setModalState] = useState<SignInScreenState>('MAIN');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpName, setSignUpName] = useState('');
    const [agreedTerms, setAgreedTerms] = useState(false);
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
    const pathname = '/';

    useEffect(() => {
        setModalState('MAIN');
        setLoginEmail('');
        setLoginPassword('');
        setSignUpEmail('');
        setSignUpName('');
        setSignUpPassword('');
        setSignUpConfirmPassword('');
        //window.localStorage.setItem('redirectUrl', pathname);
    }, [show]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleDateChange = (date: string) => {
        setFormData({
            ...formData,
            dob: date,
        });
    };
    const handlePhoneChange = (value: string) => {
        setFormData({
            ...formData,
            phone: value,
        });
    };
    function validateEmail(testMail: string): boolean {
        const re = /\S+@\S+\.\S+/;
        return re.test(testMail);
    }
    return (
        <Modal style={{ border: 'none !important' }} show={show} onHide={onHide} centered>
            <Modal.Body
                style={{
                    padding: 0,
                    backgroundColor: '#00000000',
                    borderRadius: '15px',
                }}
            >
                <div
                    className="d-flex w-100 m-0 p-0 py-2"
                    style={{
                        height: '100%',
                        width: '100%',
                        justifyContent: 'center',
                        backgroundColor: '#fefefe',
                        flexDirection: 'column',
                        borderRadius: '25px',
                        border: 'none',
                    }}
                >
                    {localModalState === 'MAIN' && (
                        <div
                            className=" d-flex w-100"
                            style={{
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                className="mt-3"
                                style={{
                                    height: '60px',
                                    width: '125px',
                                }}
                            >
                                <Image src="/etha_logo.svg" height={40} width={110} alt="" />
                            </div>
                            <h3 className="mt-2 px-3 w-100" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                Login to Get Started{' '}
                            </h3>
                            <p
                                className="px-4 mt-0"
                                style={{ width: '100%', textAlign: 'center', fontSize: '12px', color: '#676767' }}
                            >
                                Our system will create an account for you automatically, if you don&lsquo;t have an
                                account.
                            </p>
                            <div className="w-100 mt-2" style={{ textAlign: 'center' }}>
                                <Button
                                    className="p-2 my-2 "
                                    variant="outline"
                                    style={{
                                        fontSize: '14px',
                                        maxWidth: '390px',
                                        width: '90%',
                                        borderRadius: '10px',
                                        position: 'relative',
                                    }}
                                    onClick={async () => {
                                        firebaseAnalytics.logEvent('social_login_click', {
                                            type: 'google',
                                        });
                                        firebaseClient
                                            .auth()
                                            .signInWithPopup(googleProvider)
                                            .then((result) => {
                                                firebaseAnalytics.logEvent('social_login_success', {
                                                    type: 'google',
                                                });
                                                onHide();
                                            })
                                            .catch((error) => {
                                                alert('Something went wrong, Please try again later');
                                            });
                                    }}
                                >
                                    <div
                                        className="d-flex w-100"
                                        style={{ alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}
                                    >
                                        <Image
<<<<<<< Updated upstream
=======
                                            alt="Google"
>>>>>>> Stashed changes
                                            className="abs-left-25"
                                            src="/icons/google_color.svg"
                                            height={26}
                                            width={26}
                                        />
                                        &nbsp;&nbsp;Continue with Google
                                    </div>
                                </Button>
                                <Button
                                    className="p-2 my-2"
                                    variant="outline"
                                    style={{
                                        fontSize: '14px',
                                        width: '90%',
                                        maxWidth: '390px',
                                        alignItems: 'center',
                                        borderRadius: '10px',
                                        position: 'relative',
                                    }}
                                    onClick={async () => {
                                        firebaseAnalytics.logEvent('social_login_click', {
                                            type: 'apple',
                                        });
                                        firebaseClient
                                            .auth()
                                            .signInWithPopup(appleProvider)
                                            .then((result) => {
                                                firebaseAnalytics.logEvent('social_login_success', {
                                                    type: 'apple',
                                                });
                                                onHide();
                                            })
                                            .catch((error) => {
                                                alert('Something went wrong, Please try again later');
                                            });
                                    }}
                                >
                                    <div
                                        className="d-flex w-100"
                                        style={{ alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}
                                    >
                                        <Image
<<<<<<< Updated upstream
=======
                                            alt="Apple"
>>>>>>> Stashed changes
                                            className="abs-left-25"
                                            src="/icons/apple_logo.svg"
                                            height={'30px'}
                                            width={'30px'}
                                        />
                                        &nbsp;&nbsp;Continue with Apple
                                    </div>
                                </Button>
                                <p className="mt-4" style={{ color: '#676767', fontSize: '14px' }}>
                                    Or
                                </p>
                                <Button
                                    className="p-2 my-2"
                                    variant="outline"
                                    style={{
                                        fontSize: '14px',
                                        width: '90%',
                                        maxWidth: '390px',
                                        alignItems: 'center',
                                        borderRadius: '10px',
                                        position: 'relative',
                                    }}
                                    onClick={async () => {
                                        firebaseAnalytics.logEvent('mail_login_click');
                                        setModalState('SIGNIN');
                                    }}
                                >
                                    <div
                                        className="d-flex w-100"
                                        style={{ alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}
                                    >
                                        <Image
<<<<<<< Updated upstream
=======
                                            alt="Email"
>>>>>>> Stashed changes
                                            className="abs-left-25"
                                            src="/icons/mail-min.png"
                                            height={'23px'}
                                            width={'30px'}
                                        />
                                        &nbsp;&nbsp;Continue with Mail
                                    </div>
                                </Button>
                                <p
                                    className="px-4 mt-3"
                                    style={{ width: '100%', textAlign: 'center', fontSize: '12px', color: '#676767' }}
                                >
                                    By continuing you agree to our{' '}
                                    <span
                                        style={{ color: 'blue' }}
                                        onClick={() => window.open('https://etha.one/terms-of-service', '_blank')}
                                    >
                                        <u>Terms</u>
                                    </span>{' '}
                                    and{' '}
                                    <span
                                        style={{ color: 'blue' }}
                                        onClick={() => window.open('https://etha.one/privacy-policy', '_blank')}
                                    >
                                        <u>Privacy Policy</u>
                                    </span>
                                    .
                                </p>
                            </div>
                        </div>
                    )}
                    {localModalState === 'SIGNIN' && (
                        <div
                            className="d-flex"
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <div
                                className="ml-2 mt-3"
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    height: '30px',
                                    width: '30px',
                                    filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                }}
                            >
                                <Image
                                    src="/icons/back_arr.png"
                                    height={25}
                                    width={25}
                                    alt=""
                                    onClick={() => setModalState('MAIN')}
                                />
                            </div>
                            <div
                                className="mt-3"
                                style={{
                                    height: '60px',
                                    width: '125px',
                                    margin: 'auto',
                                }}
                            >
                                <Image src="/etha_logo.svg" height={40} width={110} alt="" />
                            </div>
                            <p className="ml-3 mt-2 mb-0" style={{ fontSize: '28px', fontWeight: 600 }}>
                                Sign In with Email
                            </p>
                            <p className="ml-3 mt-0" style={{ fontSize: '12px' }}>
                                Don&lsquo;t miss out on the truth.
                            </p>
                            <div className="d-flex w-100" style={{ justifyContent: 'center' }}>
                                <div
                                    className="d-flex "
                                    style={{ width: '90%', alignItems: 'start', flexDirection: 'column' }}
                                >
                                    <TextField
                                        name="email"
                                        style={{ width: '100%' }}
                                        label="E-Mail Address"
                                        variant="standard"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />

                                    <TextField
                                        className="my-2"
                                        style={{ width: '100%', height: '60px', fontSize: '14px' }}
                                        label="Password"
                                        variant="standard"
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="d-flex w-100 mt-3" style={{ justifyContent: 'flex-end' }}>
                                <Button
                                    variant="light mb-3"
                                    className="m-0"
                                    style={{
                                        width: '50%',
                                        paddingTop: '15px',
                                        paddingBottom: '15px',
                                        fontSize: '22px',
                                        fontWeight: 800,
                                        borderRadius: '25px 0px 25px 0px',
                                    }}
                                    onClick={() => {
                                        if (validateEmail(formData.email) && formData.password.length > 0) {
                                            ReactGA.event({
                                                category: 'login_email_clicked',
                                                action: `User tried logging In`,
                                                dimension7: formData.email,
                                            });
                                            firebaseClient
                                                .auth()
                                                .signInWithEmailAndPassword(formData.email, formData.password)
                                                .then((userCredentials) => {
                                                    onHide();
                                                })
                                                .catch((error) => {
                                                    if (error.code === 'auth/user-not-found') {
                                                        firebaseClient
                                                            .auth()
                                                            .createUserWithEmailAndPassword(
                                                                formData.email,
                                                                formData.password,
                                                            )
                                                            .then((userCredentials) => {
                                                                onHide();
                                                            })
                                                            .catch((error) => {
                                                                alert('Somehting went wrong, Please try again later.');
                                                            });
                                                    } else {
                                                        alert(
                                                            'Invalid Credentials, Please try with proper credentials',
                                                        );
                                                    }
                                                });
                                        } else {
                                            alert('Please try logging in with proper credentials');
                                        }
                                    }}
                                >
                                    Login&nbsp;&nbsp;&nbsp;&nbsp;
                                    <i className="fa fa-arrow-alt-circle-right" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
};
