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
    return (
        <>
            <Navbar className="pt-4" style={{ zIndex: 10, background: '#F9F9F9' }}>
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
            </Navbar>
        </>
    );
};
