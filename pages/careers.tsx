import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { NavBar } from '../components/NavBar';
import { Page } from '../components/PageComponent';
import { SubscribeToNewsLetter } from '../models/ContactUs';
import { ContactUsModal } from '../components/ContactUsModal';
import { useRouter } from 'next/router';
import { CustomButton } from '../components/Button.component';
import { CustomInput } from '../components/Input';
import { Footer } from '../components/Footer';
import { cp } from 'fs/promises';
import { SubscribeNewsletter } from '../middleware';
import CountDown from '../components/ComingSoon/Timer';
import { ComingSoon } from '../components/ComingSoon';

const Careers: NextPage = () => {
    const history = useRouter();
    const [showJoinPage, setShowJoinPage] = useState<boolean>(false);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');

    const [opacity, setOpacity] = useState(0.0);

    const [showJoinButton, setShowJoinButton] = useState<boolean>(false);

    const careersData = [
        {
            title: 'AI/ML Engineer',
            link: 'https://angel.co/company/etha/jobs/2056881-ai-ml-engineer',
            image: 'https://resources.etha.one/career-photos/AI_ML.jpg',
        },
        {
            title: 'Cybersecurity Engineer',
            link: 'https://angel.co/company/etha/jobs/1584417-lead-cyber-security-engineer',
            image: 'https://resources.etha.one/career-photos/cybersecurity.jpg',
        },
        {
            title: 'IT Administrator',
            link: 'https://angel.co/company/etha/jobs/1584426-it-administrator',
            image: 'https://resources.etha.one/career-photos/it_admin.jpg',
        },
        {
            title: 'Senior Solutions Architect',
            link: 'https://angel.co/company/etha/jobs/1584235-senior-solution-architect',
            image: 'https://resources.etha.one/career-photos/solutions_architect.jpg',
        },
        {
            title: 'Implementation Manager',
            link: 'https://angel.co/company/etha/jobs/1573574-operations-implementation-tech-director',
            image: 'https://resources.etha.one/career-photos/impl_manager.jpg',
        },
        {
            title: 'Marketing Technologist',
            link: 'https://angel.co/company/etha/jobs/1573737-marketing-technologist',
            image: 'https://resources.etha.one/career-photos/market_tech.jpg',
        },
    ];

    useEffect(() => {
        const win: Window = window;
        const onScroll: EventListener = (event: Event) => {
            if (win.scrollY >= win.innerHeight) {
                setOpacity((opacity) => (opacity > 1 ? 1 : opacity + 0.2));
                setShowJoinButton(true);
            } else {
                setOpacity((opacity) => (opacity <= 0 ? 0 : opacity - 0.2));
                opacity === 0 && setShowJoinButton(false);
            }
        };

        win.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, [opacity]);

    function validateEmail(testMail: string): boolean {
        const re = /\S+@\S+\.\S+/;
        return re.test(testMail);
    }

    return (
        <>
            <div className={styles.container}>
                <div
                    className="d-flex"
                    style={{
                        top: '0',
                        height: '60px',
                        alignItems: 'center',
                        paddingLeft: '30px',
                        padding: '3vh 80px',
                        backgroundColor: '#ffffff',
                    }}
                >
                    <div
                        className="p-0 m-0 d-flex align-items-center"
                        onClick={() => {
                            history.push('/');
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <Image
                            alt='Etha'
                            className="p-0 m-0 d-flex align-items-center mr-3"
                            height={25}
                            width={38.94}
                            src="/logo.svg"
                        />
                    </div>
                    <div
                        className={` m-0 p-0 mx-4`}
                        style={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '12px',
                            height: 'fit-content',
                            whiteSpace: 'nowrap',
                            textDecoration: 'none',
                            color: 'black',
                        }}
                        onClick={() => {
                            history.push(`/careers`);
                        }}
                    >
                        Careers
                    </div>
                    <div
                        className={` m-0 p-0 mx-4`}
                        style={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '12px',
                            height: 'fit-content',
                            whiteSpace: 'nowrap',
                            textDecoration: 'none',
                            color: 'black',
                        }}
                        onClick={() => {
                            history.push(`/about-us`);
                        }}
                    >
                        About Us
                    </div>
                </div>{' '}
                <div className={`d-flex w-100 justify-content-center `} style={{ marginTop: '0px' }}>
                    <Image className="p-0 m-0" src={`/careers/banner.jpg`} alt="" height={320} width={1125} />
                </div>
                <div
                    className={``}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '100%',
                        zIndex: 10,
                        fontWeight: 700,
                    }}
                >
                    <p style={{ fontSize: '65px', width: '75%', maxWidth: '1125px' }}>
                        What you work for should reflect what you stand for.
                    </p>
                    <p
                        style={{
                            fontSize: '20px',
                            fontWeight: '300',
                            width: '75%',
                            maxWidth: '1125px',
                            color: '#707070',
                        }}
                    >
                        Inclusion driven and diversity focused. We prioritize inclusion in order to focus on doing best
                        work of our lives together. That&lsquo;s why we continue to strengthen our long-standing
                        commitment to efforts such as inclusive hiring and development and equitable pay for all.
                    </p>
                    <p
                        style={{
                            fontSize: '25px',
                            fontWeight: '300',
                            lineHeight: '1.2rem',
                            width: '75%',
                            maxWidth: '1125px',
                        }}
                    >
                        Current Openings:
                    </p>
                </div>
                <div
                    className={`mb-5`}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        width: '100%',
                        zIndex: 10,
                        fontWeight: 700,
                    }}
                >
                    <div
                        className={`my-3`}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            width: '80%',
                            maxWidth: '1125px',
                            zIndex: 10,
                            fontWeight: 700,
                        }}
                    >
                        {' '}
                        {careersData.map((career, idx) => {
                            return (
                                <div
                                    key={career.title}
                                    className="d-flex mx-4 my-2 p-2"
                                    style={{
                                        minWidth: '150px',
                                        width: '35%',
                                        maxWidth: '400px',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        borderRadius: '15px',
                                        border: '1px solid #0e0e0e30',
                                        boxShadow: '2px 2px #70707070',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        window.open(`${career.link}`, '_blank');
                                    }}
                                >
                                    <div style={{ borderRadius: '10px' }}>
                                        <Image
                                            className="borderRadius p-0 m-0"
                                            src={`${career.image}`}
                                            alt=""
                                            height={250}
                                            width={400}
                                        />
                                    </div>
                                    <span style={{ fontSize: '20px' }}>{career.title}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center" style={{ backgroundColor: '#152649' }}>
                    <div className={styles.page_font3}>
                        <p>Join our community and get early access to a better way to get your information</p>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            height: '100%',
                            width: '100%',
                            zIndex: 10,
                        }}
                    >
                        <Image className="p-0 m-0" src={`/landing_map.svg`} alt="" height={531} width={1125} />
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                        zIndex: 10,
                    }}
                >
                    <div
                        className="d-lg-flex m-2"
                        style={{
                            height: '50%',
                            zIndex: 10,
                            padding: '80px',
                            fontSize: '2rem',
                            lineHeight: '2rem',
                            backgroundColor: '#e4e4f7',
                            borderRadius: '30px',
                            fontWeight: '600',
                            transform: 'translateY(-100px)',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '80%',
                            }}
                        >
                            <p>Subscribe to our newsletter today!</p>
                            <p style={{ fontSize: '0.8rem', fontWeight: '300', lineHeight: '1.2rem' }}>
                                Sign up to receive free daily briefings and newsletters, curated by Etha
                            </p>
                        </div>
                        <div
                            style={{
                                backgroundColor: '#ffffff',
                                width: '100%',
                                padding: '60px',
                                borderRadius: '20px',
                                boxShadow: '0px 3px 24px rgba(234, 234, 234, 0.25)',
                            }}
                        >
                            <CustomInput
                                label="Fullname"
                                type="text"
                                placeHolder=""
                                val={(e) => setFullname(e)}
                                value={fullname}
                            />
                            <CustomInput
                                label="Email address"
                                type="email"
                                placeHolder=""
                                val={(e) => setEmail(e)}
                                value={email}
                            />
                            <CustomButton
                                placeHolder="Subscribe to Newsletter"
                                width="100%"
                                click={() => {
                                    if (validateEmail(email) && fullname.length > 0) {
                                        const subscribeToNewsLetter: SubscribeToNewsLetter = {
                                            name: fullname,
                                            email: email,
                                            message: 'Subscribe to news letter',
                                        };
                                        SubscribeNewsletter(subscribeToNewsLetter, () => {
                                            alert('Submitted your request to subscribe to our newsletter');
                                            setFullname('');
                                            setEmail('');
                                        });
                                    } else {
                                        alert(`Enter the correct values`);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="d-none d-lg-flex justify-content-center">
                    <Footer />
                </div>
                {showJoinButton && (
                    <div
                        className="d-lg-none m-0 px-5 py-2 d-flex align-items-center fixed-bottom"
                        style={{ backgroundColor: '#fff', opacity: `${opacity}` }}
                    >
                        <CustomButton
                            placeHolder="Give Feedback"
                            width="100%"
                            click={() => {
                                setShowJoinPage(true);
                            }}
                        />
                    </div>
                )}
            </div>
            <ContactUsModal show={showJoinPage} onHide={() => setShowJoinPage(false)} />
        </>
    );
};

export default Careers;
