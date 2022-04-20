// Dependencies
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, FormControl, InputGroup, FormCheck } from 'react-bootstrap';
import ReactGA from 'react-ga';
import { useDispatch } from 'react-redux';
import Image from 'next/image';

// Components
import { signInUser, signUpUser } from '../middleware';
import { User } from '../models';
import { AppDispatch } from '../redux/store';
import { APPLE_AUTH_URL, FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from '../services/API';
import { toast } from 'react-toastify';

interface SignInModalProps {
    show: boolean;
    onHide: () => void;
}

type SignInScreenState = 'MAIN' | 'SIGNIN' | 'SIGNUP';

export const SignInModal: React.FC<SignInModalProps> = (props: SignInModalProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { show, onHide } = props;
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
                <Col
                    className="d-flex m-0 p-0"
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
                        <>
                            <div
                                className="mt-3 ml-3"
                                style={{
                                    height: '60px',
                                    width: '125px',
                                }}
                            >
                                <Image src="/etha_logo.svg" height={60} width={125} alt="" objectFit="contain" />
                            </div>{' '}
                            <p className="ml-3 mt-2" style={{ fontSize: '35px', marginTop: '', fontWeight: 'bold' }}>
                                Hi, Welcome Back
                            </p>
                            <p className="ml-3" style={{ fontSize: '18px' }}>
                                <b> Sign In</b> With
                            </p>
                            <div className="ml-3 d-flex w-100" style={{ alignItems: 'center' }}>
                                {/* {Capacitor.getPlatform() !== 'web' ? (
                                    <>
                                        {' '}
                                        <Image
                                            className="m-1"
                                            src="/icons/facebook.png"
                                            height="58px"
                                            onClick={async () => {
                                                await Browser.open({
                                                    url: `${FACEBOOK_AUTH_URL}?currentPath=${pathname}`,
                                                });
                                            }}
                                        />
                                        <Image
                                            className="m-1"
                                            src="/icons/google.png"
                                            height="72px"
                                            onClick={async () => {
                                                await Browser.open({
                                                    url: `${GOOGLE_AUTH_URL}?currentPath=${pathname}`,
                                                });
                                            }}
                                        />
                                    </>
                                ) : (
                                    <> */}
                                {/* <a
                                    style={{
                                        margin: '5px',
                                        paddingLeft: '5px',
                                        paddingRight: '5px',
                                        width: '50px',
                                        backgroundColor: '#ffffff',
                                        textAlign: 'center',
                                        borderRadius: '5px',
                                        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.1)',
                                    }}
                                    href={`${FACEBOOK_AUTH_URL}?currentPath=${pathname}&platform=facebook`}
                                >
                                    <Image
                                        src="/icons/facebook-min.png"
                                        height={20}
                                        width={20}
                                        alt=""
                                        objectFit="contain"
                                    />
                                </a> */}

                                <a
                                    style={{
                                        margin: '5px',
                                        paddingLeft: '5px',
                                        paddingRight: '5px',
                                        width: '50px',
                                        height: '27px',
                                        backgroundColor: '#ffffff',
                                        textAlign: 'center',
                                        verticalAlign: 'middle',
                                        borderRadius: '5px',
                                        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.1)',
                                    }}
                                    href={`${GOOGLE_AUTH_URL}?currentPath=${pathname}&platform=google`}
                                >
                                    <Image src="/icons/google.png" height={25} width={25} alt="" objectFit="contain" />
                                </a>
                                <a
                                    style={{
                                        margin: '5px',
                                        paddingLeft: '5px',
                                        paddingRight: '5px',
                                        width: '50px',
                                        height: '27px',
                                        backgroundColor: '#ffffff',
                                        textAlign: 'center',
                                        borderRadius: '5px',
                                        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.1)',
                                    }}
                                    href={`${APPLE_AUTH_URL}?currentPath=${pathname}&platform=apple`}
                                >
                                    <Image
                                        src="/icons/apple-min.png"
                                        height={20}
                                        width={20}
                                        alt=""
                                        objectFit="contain"
                                    />
                                </a>
                                <p
                                    style={{
                                        margin: '5px',
                                        paddingLeft: '5px',
                                        paddingRight: '5px',
                                        width: '50px',
                                        height: '27px',
                                        backgroundColor: '#ffffff',
                                        textAlign: 'center',
                                        borderRadius: '5px',
                                        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.1)',
                                    }}
                                    onClick={() => setModalState('SIGNIN')}
                                >
                                    <Image
                                        src="/icons/mail-min.png"
                                        height={20}
                                        width={20}
                                        alt=""
                                        objectFit="contain"
                                    />
                                </p>
                                {/* </>
                                )} */}
                            </div>
                            <Button
                                variant="link"
                                type="button"
                                className="mt-3 mb-2"
                                style={{ width: '350px' }}
                                onClick={() => setModalState('SIGNUP')}
                            >
                                Don&apos;t have an Account? Sign Up Here
                            </Button>
                        </>
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
                                    src="/icons/back_arr.png"
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
                                    <FormControl
                                        className="mb-1"
                                        value={loginEmail}
                                        onChange={(event) => {
                                            setLoginEmail(event.target.value);
                                        }}
                                        style={{ borderRadius: '25px', color: '#676AB1', width: '100%' }}
                                        type="email"
                                        placeholder="Email"
                                    />
                                    <p className="mt-3 mb-0" style={{ fontSize: '18px' }}>
                                        Password
                                    </p>
                                    <FormControl
                                        className="mb-2"
                                        value={loginPassword}
                                        onChange={(event) => {
                                            setLoginPassword(event.target.value);
                                        }}
                                        style={{ borderRadius: '25px', color: '#676AB1', width: '100%' }}
                                        type="password"
                                        placeholder="Password"
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
                                    src="/icons/back_arr.png"
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
                </Col>
            </Modal.Body>
        </Modal>
    );
};
