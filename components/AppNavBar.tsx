// Dependencies
import { useAppDispatch, useAppSelector } from '../redux/store';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Col, Form, InputGroup, Button } from 'react-bootstrap';
import Image from 'next/image';
// import { useHistory, useLocation } from 'react-router-dom';
import { setContactFormVisibility, setModalVisibility } from '../redux';
// Components
// CSS
import { useRouter } from 'next/router';
import styles from '../styles/NavBar.module.css';

export const AppNavBar: React.FC = () => {
    const [pageName, setPageName] = useState('Home');
    const [isPageStatic, setPageStatic] = useState(false);
    const [isBackEnabled, setBackEnabled] = useState(false);
    const [searchParam, setSearchParam] = useState('');
    const [contactUsVisible, setContactUsVisible] = useState(false);

    const history = useRouter();
    const pathname = history.pathname;

    const dispatch = useAppDispatch();
    const state = useAppSelector((reduxState) => ({
        signed_in: reduxState.userReducer.signed_in,
        userName: reduxState.userReducer.name,
    }));
    function handleKeyPress(target: React.KeyboardEvent) {
        if (target.key === 'Enter') {
            if (searchParam.length > 1) {
                history.push({ pathname: '/search', search: `?searchParam=${searchParam}` });
                setSearchParam('');
            }
        }
    }
    useEffect(() => {
        setBackEnabled(false);
        switch (pathname.split('/')[1]) {
            case 'post':
                setBackEnabled(true);
                break;
            case 'politician':
                setBackEnabled(true);
                break;
            case 'activity':
                setBackEnabled(true);
                break;
        }
    }, [pathname, setPageName, setPageStatic]);
    return (
        <>
            <div className={`${styles.navBar_large} d-flex`}>
                <Col xs={3} className="d-none d-md-block text-center">
                    <div
                        style={{
                            cursor: 'pointer',
                        }}
                    >
                        <Image
                            className=""
                            src="/etha_logo.svg"
                            alt=""
                            height={40}
                            width={100}
                            onClick={() => history.push('/home')}
                        />
                    </div>
                </Col>
                <Col xs={2} className="d-block d-md-none text-center m-0 p-0">
                    <div
                        style={{
                            height: '100%',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        {pathname.includes('post/') || pathname.includes('profile/') ? (
                            <>
                                <i
                                    className="fa fa-arrow-alt-circle-left"
                                    style={{ fontSize: '24px', color: '#4824D6' }}
                                    onClick={() => {
                                        history.back();
                                    }}
                                />
                            </>
                        ) : (
                            <Image
                                className=""
                                src="/logo.svg"
                                alt=""
                                height={30}
                                width={30}
                                onClick={() => history.push('/home')}
                            />
                        )}
                    </div>
                </Col>
                <Col className="m-0 p-0">
                    <div className="d-flex justify-content-center text-ccenter">
                        <InputGroup
                            className={`${styles.search_bar} m-0 mx-2 p-0`}
                            style={{
                                background: '#F3F5F7',
                                borderRadius: '27px',
                            }}
                        >
                            <div
                                className="d-flex pl-2 mr-2"
                                style={{
                                    height: '100%',
                                    width: '38px',
                                    alignItems: 'center',
                                    borderRadius: '0px 5px 5px 0px',
                                    cursor: 'pointer',
                                    filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                }}
                            >
                                <Image
                                    src="/icons/search.png"
                                    height={36}
                                    width={46}
                                    alt=""
                                    className=" my-auto pl-2"
                                    onClick={() => {
                                        if (searchParam.length > 1) {
                                            history.push({
                                                pathname: '/search',
                                                search: `?searchParam=${searchParam.trim()}`,
                                            });
                                            setSearchParam('');
                                        }
                                    }}
                                />
                            </div>
                            <Form.Control
                                style={{
                                    height: '100%',
                                    borderRadius: '27px',
                                    border: '0px',
                                    backgroundColor: '#F3F5F7',
                                    color: 'black',
                                }}
                                value={searchParam}
                                size="lg"
                                type="text"
                                placeholder="Search..."
                                onKeyPress={handleKeyPress}
                                onChange={(event) => {
                                    setSearchParam(event.target.value);
                                }}
                            />
                        </InputGroup>
                    </div>
                </Col>

                <Col xs={3} className="text-center d-none d-md-flex" style={{ color: '#fefefe' }}>
                    {state.signed_in ? (
                        <Button
                            variant="header my-3 mx-2"
                            onClick={() => {
                                history.push('/profile');
                            }}
                            style={{ fontSize: '16px', color: '#707070' }}
                        >
                            <i className="fa fa-user-circle" /> Hi, {state.userName?.split(' ')[0]}
                        </Button>
                    ) : (
                        <Button
                            variant="header my-3 mx-2"
                            onClick={() => {
                                dispatch(setModalVisibility(true));
                            }}
                            style={{ fontSize: '16px', color: '#707070' }}
                        >
                            <i className="fas fa-user" />
                            {'    '}Sign In
                        </Button>
                    )}
                </Col>
                <Col xs={2} className="text-center d-flex d-md-none m-0 p-0" style={{ justifyContent: 'center' }}>
                    {state.signed_in ? (
                        <Button
                            variant="header m-0 p-0"
                            onClick={() => {
                                history.push('/profile');
                            }}
                            style={{ fontSize: '28px', color: '#707070' }}
                        >
                            <i className="fa fa-user-circle" />
                        </Button>
                    ) : (
                        <Button
                            variant="header my-3 mx-2"
                            onClick={() => {
                                dispatch(setModalVisibility(true));
                            }}
                            style={{ fontSize: '28px', color: '#707070' }}
                        >
                            <i className="fas fa-user" />
                        </Button>
                    )}
                </Col>
            </div>

            {/* Smaller Header d-sm-flex d-md-none*/}
            {/* <div
                        className={`${styles.search_header_container} d-sm-flex d-md-none w-100 m-auto pt-2 pb-1'}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: `${isPageSearch ? '#00000000' : '#fff'}`,
                            boxShadow: `${isPageSearch ? '' : '#00000070 0px 3px 5px'}`,
                        }}
                    >
                        {isPageSearch ? (
                            <InputGroup
                                className={`${styles.search_bar} m-0 mx-2 p-0`}
                                style={{
                                    background: '#fff',
                                    boxShadow: '#00000070 0px 3px 6px 0px',
                                    borderRadius: '5px 5px 5px 5px',
                                }}
                            >
                                <Form.Control
                                    style={{
                                        height: '100%',
                                        borderRadius: '5px 0px 0px 5px',
                                        border: '0px',
                                        color: '#707070',
                                    }}
                                    value={searchParam}
                                    size="lg"
                                    type="text"
                                    placeholder="Search..."
                                    onKeyPress={handleKeyPress}
                                    onChange={(event) => {
                                        setSearchParam(event.target.value);
                                    }}
                                />
                                <Image
                                    src="/icons/search.png"
                                    height="38px"
                                    className="p-2 my-auto mr-2"
                                    style={{
                                        borderRadius: '0px 5px 5px 0px',
                                        filter: 'invert(48%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(90%) contrast(89%)',
                                    }}
                                    onClick={() => {
                                        if (searchParam.length > 1) {
                                            history.push({
                                                pathname: '/search',
                                                search: `?searchParam=${searchParam.trim()}`,
                                            });
                                            setSearchParam('');
                                        }
                                    }}
                                />
                            </InputGroup>
                        ) : (
                            <>
                                <Col xs={3} className="text-center">
                                    <img
                                        className=""
                                        src={isBackEnabled ? '/back_button.png' : '/apple-icon.png'}
                                        alt=""
                                        height="50px"
                                        onClick={() => {
                                            if (!isBackEnabled) {
                                                history.push('/');
                                            } else {
                                                if (history.action !== 'POP') {
                                                    history.goBack();
                                                } else {
                                                    history.push('/');
                                                }
                                            }
                                        }}
                                    />
                                </Col>
                                <Col
                                    className="d-flex text-center"
                                    style={{ flexDirection: 'column', alignItems: 'center' }}
                                >
                                    <h3 className="m-auto">{pageName}</h3>
                                </Col>
                                <Col
                                    xs={3}
                                    className="d-flex text-center"
                                    style={{ flexDirection: 'column', alignItems: 'center' }}
                                ></Col>
                            </>
                        )}
                    </div> */}
        </>
    );
};
