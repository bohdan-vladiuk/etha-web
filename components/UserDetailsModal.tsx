import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Image, FormControl, InputGroup, FormCheck } from 'react-bootstrap';
import ReactGA from 'react-ga';
import { useDispatch } from 'react-redux';
import { checkUser, signInUser, signUpUser } from '../middleware';
import { User } from '../models';
import { AppDispatch } from '../redux/store';
import { APPLE_AUTH_URL, FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from '../services/API';
import { toast } from 'react-toastify';
import { TextField } from '@material-ui/core';
import { firebaseAnalytics } from '../auth/firebaseClient';

interface SignInModalProps {
    show: boolean;
    onHide: () => void;
}

type SignInScreenState = 'MAIN' | 'SIGNIN' | 'SIGNUP';

export const UserDetailsModal: React.FC<SignInModalProps> = (props: SignInModalProps) => {
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
                    {localModalState === 'MAIN' ? (
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
                                <br />
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
                                <Button
                                    className="mt-2"
                                    onClick={async () => {
                                        if (validateEmail(formData.email)) {
                                            setModalState('SIGNIN');
                                        } else {
                                            toast('Please Enter a Valid Email Address');
                                        }
                                    }}
                                    style={{
                                        backgroundColor: '#4824d6',
                                        color: '#fff',
                                        width: '90%',
                                        borderRadius: '10px',
                                    }}
                                >
                                    Continue
                                </Button>

                                <p className="mt-4" style={{ color: '#676767', fontSize: '14px' }}>
                                    Or
                                </p>
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
                                    }}
                                >
                                    <div
                                        className="d-flex w-100"
                                        style={{ alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}
                                    >
                                        <Image

                                            alt='Google'
                                            className="abs-left-25"
                                            src="icons/google_color.svg"
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
                                    }}
                                >
                                    <div
                                        className="d-flex w-100"
                                        style={{ alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}
                                    >
                                        <Image
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
                                            alt="Apple"
>>>>>>> Stashed changes
=======
                                            alt='Apple'
>>>>>>> cd2630a850a965b9387211baec34de8a2a8e97e7
                                            className="abs-left-25"
                                            src="icons/apple_logo.svg"
                                            height={'30px'}
                                            width={'30px'}
                                        />
                                        &nbsp;&nbsp;Continue with Apple
                                    </div>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {localModalState === 'SIGNIN' ? (
                        <div style={{ width: '100%' }}>
                            <div
                                className="ml-2 mt-3"
                                style={{
                                    height: '25px',
                                    width: '25px',
                                    filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                }}
                            >
                                <Image
                                    src="icons/back_arr.png"
                                    height={25}
                                    width={25}
                                    alt=""
                                    onClick={() => setModalState('MAIN')}
                                />
                            </div>
                            <div
                                className="mt-3 ml-3"
                                style={{
                                    height: '60px',
                                    width: '125px',
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
                                    <p className="mt-3 mb-0" style={{ fontSize: '18px' }}>
                                        Email
                                    </p>
                                    <TextField
                                        name="email"
                                        style={{ width: '90%', maxWidth: '390px' }}
                                        label="E-Mail Address"
                                        variant="standard"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />

                                    <p className="mt-3 mb-0" style={{ fontSize: '18px' }}>
                                        Password
                                    </p>
                                    <TextField
                                        className="my-1"
                                        style={{ width: '90%', height: '60px', fontSize: '14px' }}
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
                                        if (validateEmail(loginEmail) && loginPassword.length > 0) {
                                            ReactGA.event({
                                                category: 'login_email_clicked',
                                                action: `User tried logging In`,
                                                dimension7: loginEmail,
                                            });
                                            const user: User = {
                                                email: loginEmail,
                                                password: loginPassword,
                                            };
                                            // fetchUserList();
                                            signInUser(user, dispatch, onHide);
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
                    ) : (
                        <></>
                    )}
                    {localModalState === 'SIGNUP' ? (
                        <>
                            <div
                                className="ml-2 mt-3"
                                style={{
                                    height: '25px',
                                    width: '25px',
                                    filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                }}
                            >
                                <Image
                                    src="icons/back_arr.png"
                                    height={25}
                                    width={25}
                                    alt=""
                                    onClick={() => setModalState('MAIN')}
                                />
                            </div>
                            <div
                                className="mt-3 ml-3"
                                style={{
                                    height: '60px',
                                    width: '125px',
                                }}
                            >
                                <Image src="/etha_logo.svg" height={40} width={110} alt="" />
                            </div>{' '}
                            <p className="ml-3 mt-2 mb-0" style={{ fontSize: '28px', fontWeight: 600 }}>
                                Create an Account
                            </p>
                            <div className="d-flex w-100" style={{ justifyContent: 'center' }}>
                                <div
                                    className="d-flex "
                                    style={{ width: '90%', alignItems: 'start', flexDirection: 'column' }}
                                >
                                    <h6 className="mt-1" style={{ fontSize: '18px' }}>
                                        Enter your Name
                                    </h6>
                                    <FormControl
                                        type="name"
                                        className="mb-3"
                                        style={{ borderRadius: '25px', width: '100%' }}
                                        value={signUpName}
                                        onChange={(event) => {
                                            setSignUpName(event.target.value);
                                        }}
                                        placeholder="Full Name"
                                    />
                                    <h6 className="mt-1" style={{ fontSize: '18px' }}>
                                        Email Address
                                    </h6>
                                    <FormControl
                                        type="email"
                                        value={signUpEmail}
                                        className="mb-3"
                                        style={{ borderRadius: '25px', width: '100%' }}
                                        onChange={(event) => {
                                            setSignUpEmail(event.target.value);
                                        }}
                                        placeholder="Email Address"
                                    />
                                    <h6 className="mt-1" style={{ fontSize: '18px' }}>
                                        Password
                                    </h6>
                                    <FormControl
                                        value={signUpPassword}
                                        style={{ borderRadius: '25px', width: '100%' }}
                                        className="mb-3"
                                        onChange={(event) => {
                                            setSignUpPassword(event.target.value);
                                        }}
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <h6 className="mt-1" style={{ fontSize: '18px' }}>
                                        Re-enter Password
                                    </h6>
                                    <FormControl
                                        value={signUpConfirmPassword}
                                        style={{ borderRadius: '25px', width: '100%' }}
                                        className=" mb-3"
                                        onChange={(event) => {
                                            setSignUpConfirmPassword(event.target.value);
                                        }}
                                        type="password"
                                        placeholder="Confirm Password"
                                    />
                                    <InputGroup className="mt-1 mb-2">
                                        <FormCheck
                                            aria-label="Checkbox for following text input"
                                            checked={agreedTerms}
                                            onChange={(event) => {
                                                setAgreedTerms(event.target.checked);
                                            }}
                                        />
                                        By Signing Up, you agree to adhere to our{' '}
                                        <a href="https://etha.one/terms-of-service" target="_blank" rel="noreferrer">
                                            Terms of Service
                                        </a>
                                        &nbsp;and&nbsp;
                                        <a href="https://etha.one/privacy-policy" target="_blank" rel="noreferrer">
                                            Privacy Policy
                                        </a>
                                    </InputGroup>
                                </div>
                            </div>
                            <div className="d-flex w-100 mt-2" style={{ justifyContent: 'center' }}>
                                <Button
                                    variant="primary"
                                    style={{
                                        width: '50%',
                                    }}
                                    onClick={() => {
                                        if (
                                            signUpPassword === signUpConfirmPassword &&
                                            signUpName.length > 0 &&
                                            validateEmail(signUpEmail) &&
                                            signUpPassword.length > 5 &&
                                            agreedTerms
                                        ) {
                                            ReactGA.event({
                                                category: 'signup_email_clicked',
                                                action: `User tried signing Up`,
                                                dimension7: signUpEmail,
                                            });
                                            const user: User = {
                                                name: signUpName,
                                                email: signUpEmail,
                                                password: signUpPassword,
                                            };
                                            signUpUser(user, dispatch, onHide);
                                        } else if (!agreedTerms) {
                                            toast('Please accept the Terms and Condtittions for using the applicaiton');
                                        } else if (signUpPassword.length <= 5) {
                                            toast('Your Password should be atleast 6 characters Long');
                                        } else if (signUpConfirmPassword !== signUpPassword) {
                                            toast('Please make sure to confirm the correct Password.');
                                        } else {
                                            toast('Please check your credentials and try again');
                                        }
                                    }}
                                    type="button"
                                >
                                    Register
                                </Button>
                            </div>
                            <Button
                                variant="link"
                                type="button"
                                className="mt-2 mb-2"
                                onClick={() => setModalState('MAIN')}
                            >
                                Already a User? <u>Log In</u>
                            </Button>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
};
