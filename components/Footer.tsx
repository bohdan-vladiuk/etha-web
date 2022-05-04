import React from 'react';
import { Modal } from 'react-bootstrap';
import Image from 'next/image';
import styles from '../styles/Footer.module.css';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = (props: FooterProps) => {
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
        <>
            <div className={`${styles.footer_container}`}>
                <div className="d-flex flex-column align-items-start ">
                    <Image className="" src={`/etha_logo.svg`} alt="" height={30} width={80} />
                    <p className="pt-2" style={{ fontSize: '0.8rem' }}>
                        Connecting the world with ideas <br />
                        and information
                    </p>
                </div>
                {Object.entries(data).map((title, idx) => {
                    return (
                        <div key={idx} className="d-flex flex-column">
                            <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{title[0]}</p>
                            {title[1].map((details, index) => {
                                return (
                                    <a
                                        key={index}
                                        style={{
                                            fontSize: '0.7rem',
                                            textDecoration: 'none',
                                            color: '#000',
                                            fontWeight: '300',
                                        }}
                                        href={details[1]}
                                    >
                                        {details[0]}
                                    </a>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </>
    );
};
