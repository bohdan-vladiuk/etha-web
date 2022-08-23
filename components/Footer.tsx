import React, { useState } from 'react';
import { Button, Col, Container, Modal } from 'react-bootstrap';
import Image from 'next/image';
import styles from '../styles/Footer.module.css';
import { SocialIcons } from './SocialIcons';
import { ContactUsModal } from './ContactUsModal';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = (props: FooterProps) => {
    const [showJoinPage, setShowJoinPage] = useState<boolean>(false);

    const data = {
        Resources: [
            ['Blog', '/'],
            ['Privacy Policy', '/privacy-policy'],
            ['Cookie Policy', '/'],
            ['Terms and Conditions', '/terms-of-service'],
        ],
        Help: [
            ['Community', '/'],
            ['Help Center', '/'],
            ['Security', '/'],
            ['System Status', '/'],
        ],
        Company: [
            ['About us', '/about-us'],
            ['Careers', '/'],
        ],
        Follow: [
            ['Instagram', 'https://www.instagram.com/ethaofficialapp'],
            ['Twitter', 'https://twitter.com/getEtha'],
            ['Facebook', 'https://www.facebook.com/EthaOfficialApp'],
            ['LinkedIn', 'https://www.linkedin.com/company/ethaofficialapp'],
        ],
    };
    return (
        <Container>
            <div className={`${styles.footer_header}`}>Download Etha today</div>
            <div
                className="d-flex w-100 p-0 mt-4 mr-4 mb-3"
                style={{ cursor: 'pointer', alignItems: 'left', flexWrap: 'wrap' }}
            >
                <Button
                    variant="primary ml-0 mr-2"
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
                    <Image className="p-0 py-0 pr-2" src={`/home/play-store.svg`} alt="" height={40} width={120} />
                </Button>
                <Button
                    variant="light ml-0 mr-2"
                    style={{
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none !important',
                    }}
                    onClick={() => window.open('https://apps.apple.com/me/app/etha/id1588384989', '_blank')}
                >
                    <Image className="p-0 py-0" src={`/home/app-store.svg`} alt="" height={40} width={120} />
                </Button>
            </div>
            <div
                className="d-flex w-100 mt-5"
                style={{
                    justifyContent: 'space-evenly',
                    flexWrap: 'wrap-reverse',
                    color: '#fff',
                    marginBottom: '70px',
                }}
            >
                <Col lg={6} className="d-flex px-1">
                    <div
                        className={styles.footerLink}
                        onClick={() => {
                            window.open('https://etha.one/privacy-policy', '_blank');
                        }}
                    >
                        Privacy Policy
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div
                        onClick={() => {
                            window.open('https://etha.one/terms-of-service', '_blank');
                        }}
                        className={styles.footerLink}
                    >
                        Terms
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div style={{ color: '#fff' }}>© 2022 All Rights Reserved</div>
                </Col>
                <Col lg={6} className="d-flex" style={{ justifyContent: 'flex-end' }}>
                    <div
                        className={styles.footerLink}
                        onClick={() => {
                            window.open('https://etha.one/about-us', '_blank');
                        }}
                    >
                        About
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div
                        className={styles.footerLink}
                        onClick={() => {
                            setShowJoinPage(true);
                        }}
                    >
                        Contact
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div
                        className={styles.footerLink}
                        onClick={() => {
                            window.open('https://wefunder.com/etha.one', '_blank');
                        }}
                    >
                        Invest
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <SocialIcons variant="dark" />
                </Col>
            </div>
            <ContactUsModal show={showJoinPage} onHide={() => setShowJoinPage(false)} />
        </Container>
    );
};
