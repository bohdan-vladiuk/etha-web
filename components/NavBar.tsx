// Dependencies
import { useAppDispatch, useAppSelector } from '../redux/store';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Col, Form, InputGroup, Button } from 'react-bootstrap';
import Image from 'next/image';
// import { useHistory, useLocation } from 'react-router-dom';
import { setContactFormVisibility } from '../redux';
// Components
// CSS
import { useRouter } from 'next/router';
import styles from '../styles/NavBar.module.css';
import Link from 'next/link';
import { ContactUsModal } from './ContactUsModal';

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
    // 'About us', 'Publishers', 'Brand', 'Business', 'Careers',
    const navTitles = ['Feedback'];

    return (
        <>
            <div className={`${styles.home_nav_container}`}>
                <div
                    className="p-0 m-0 d-flex align-items-center"
                    onClick={() => {
                        history.push('/');
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    <Image
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
                {navTitles.map((val, idx) => {
                    return (
                        <div
                            key={`${val}-${idx}`}
                            className={`${styles.nav_link} m-0 p-0 mx-4`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setShowJoinPage(true);
                                //history.push(`/${val.toLowerCase().split(' ')[0]}`);
                            }}
                        >
                            {val}
                        </div>
                    );
                })}
            </div>
            {/* <Navbar className="pt-4" style={{ zIndex: 10, background: '#F9F9F9' }}>
                <Navbar.Brand className="d-sm-flex d-md-none" href="/landing">
                    <Image className="pl-3" src="/nav_logo.png" alt="" height={25} width={120} />
                </Navbar.Brand>
                <Navbar.Brand className="d-none d-md-flex" href="/landing">
                    <Image className="pl-5" src="/nav_logo.png" alt="" height={25} width={120} />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Nav className="ml-auto d-none d-md-flex pr-5">
                    <Nav.Link href="/landing">Home</Nav.Link>
                    <Nav.Link href="/press-release/etha-launch">Press Release</Nav.Link>
                    <Nav.Link href="/discover">Discover Politics</Nav.Link>
                    <Nav.Link href="/investments">Investments</Nav.Link>
                    <Nav.Link href="/about-us">About Us</Nav.Link>
                    <Nav.Link
                        onClick={() => {
                            dispatch(setContactFormVisibility(true));
                        }}
                    >
                        Contact Us
                    </Nav.Link>
                </Nav>
            </Navbar> */}
            <ContactUsModal show={showJoinPage} onHide={() => setShowJoinPage(false)} />
        </>
    );
};
