import { useAppDispatch, useAppSelector } from '../redux/store';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Col, Form, InputGroup, Button, Container, NavDropdown } from 'react-bootstrap';
import Image from 'next/image';
import { setContactFormVisibility } from '../redux';
import { useRouter } from 'next/router';
import styles from '../styles/NavBar.module.css';
import Link from 'next/link';
import { ContactUsModal } from './ContactUsModal';
import { ButtonBase } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';

const ignorePathnames = [
    '/landing',
    '/about-us',
    '/discover',
    '/political-spectrum',
    '/political-timeline',
    '/investments',
    '/unsubscribe',
    '/press-release/etha-launch',
    '/privacy-policy',
    '/terms-of-service',
];

export const NavBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const history = useRouter();
    const [showJoinPage, setShowJoinPage] = useState<boolean>(false);
    const [hidden, setHidden] = useState<boolean>(true);

    useEffect(() => {
        window.addEventListener('scroll', stickNavbar);

        return () => {
            window.removeEventListener('scroll', stickNavbar);
        };
    }, []);

    const stickNavbar = () => {
        if (window !== undefined) {
            let windowHeight = window.scrollY;
            windowHeight > 550 ? setHidden(false) : setHidden(true);
        }
    };

    return (
        <>
            <Navbar
                collapseOnSelect
                expand="lg"
                sticky="top"
                variant="light"
                className={hidden ? styles.sticky_navbar_hidden : styles.sticky_navbar}
            >
                <Container>
                    <Navbar.Brand href="#home">
                        <Image
                            alt="Etha"
                            className="p-0 m-0 d-flex align-items-center mr-3"
                            height={'28px'}
                            width={'100%'}
                            src="/logo.svg"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ color: '#000 !important' }} />
                    <Navbar.Collapse id="responsive-navbar-nav" className="m-auto">
                        <Nav className="d-flex w-100" style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Nav.Link href="/about-us" style={{ color: '#000' }}>
                                About Us
                            </Nav.Link>
                            <Nav.Link style={{ color: '#000' }} onClick={() => setShowJoinPage(true)}>
                                Contact
                            </Nav.Link>
                            <Nav.Link
                                style={{ color: '#000' }}
                                onClick={() => window.open('https://wefunder.com/etha.one', '_blank')}
                            >
                                Invest Now
                            </Nav.Link>
                            <Button
                                variant="primary ml-2 mr-2"
                                style={{
                                    borderRadius: '5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minWidth: '50px !important',
                                    width: '100px !important',
                                }}
                                onClick={() =>
                                    window.open('https://play.google.com/store/apps/details?id=one.etha.app', '_blank')
                                }
                            >
                                <Image
                                    className="p-0 py-0 pr-2"
                                    src={`/home/play-store.svg`}
                                    alt=""
                                    height={40}
                                    width={120}
                                />
                            </Button>
                            <Button
                                variant="light mr-0"
                                style={{
                                    borderRadius: '5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: 'none !important',
                                }}
                                onClick={() => window.open('https://apps.apple.com/me/app/etha/id1588384989', '_blank')}
                            >
                                <Image
                                    className="p-0 py-0"
                                    src={`/home/app-store.svg`}
                                    alt=""
                                    height={40}
                                    width={120}
                                />
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* <div className={`${styles.home_nav_container}`}>
                <div
                    className="p-0 m-0 d-flex align-items-center"
                    onClick={() => {
                        history.push('/');
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    <Image
                        alt="Etha"
                        className="p-0 m-0 d-flex align-items-center mr-3"
                        height={25}
                        width={38.94}
                        src="/logo.svg"
                    />
                </div>
                <div
                    className={`${styles.nav_link} m-0 p-0 mx-4`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        history.push(`/about-us`);
                    }}
                >
                    About Us
                </div>
                <div
                    className={`${styles.nav_link} m-0 p-0 mx-4`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        setShowJoinPage(true);
                    }}
                >
                    Contact
                </div>

                <Button
                    variant="primary"
                    href="https://wefunder.com/etha.one"
                    style={{
                        borderRadius: '10px',
                        position: 'absolute',
                        right: '25px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    Invest Now <ArrowForwardIos fontSize="small" />
                </Button>
            </div> */}

            <ContactUsModal show={showJoinPage} onHide={() => setShowJoinPage(false)} />
        </>
    );
};
