import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { NavBar } from '../components/NavBar';
import { Page } from '../components/PageComponent';
import { ContactUsModal } from '../components/ContactUsModal';
import { CustomButton } from '../components/Button.component';
import { Footer } from '../components/Footer';
import { Button, Col, Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { ArrowDownward, ArrowDownwardRounded, ArrowForwardIos } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { setModalVisibility } from '../redux';

const Home: NextPage = () => {
    const [showJoinPage, setShowJoinPage] = useState<boolean>(false);
    const [showJoinButton, setShowJoinButton] = useState<boolean>(false);
    const [opacity, setOpacity] = useState(0.0);

    const state = useAppSelector((reduxState) => ({
        signedIn: reduxState.userReducer.signed_in,
    }));
    const history = useRouter();
    const dispatch = useAppDispatch();

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
                {showJoinButton && <NavBar />}
                <div className={`${styles.landing_container}`}>
                    <Container className="mb-0" style={{ paddingBottom: '40px' }}>
                        <div
                            className="d-flex w-100"
                            style={{
                                justifyContent: 'center',
                                paddingTop: '60px',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}
                        >
                            <Col lg={5}>
                                <Image src="/home/iphone-1.png" height={601} width={460} />
                            </Col>
                            <Col lg={7}>
                                <h1 className={styles.home_header}>Let's Fix the System</h1>
                                <p className={styles.home_content_grey}>
                                    Introducing Etha - your new favorite interactive social news platform, which helps
                                    you hold politicians accountable and mitigates the spread of misinformation.
                                </p>
                                <div
                                    className="d-flex p-0 mt-4 mr-4"
                                    style={{ cursor: 'pointer', alignItems: 'center', flexWrap: 'wrap' }}
                                >
                                    <Col md={3.5} className="m-0 p-0">
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
                                                window.open(
                                                    'https://play.google.com/store/apps/details?id=one.etha.app',
                                                    '_blank',
                                                )
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
                                    </Col>
                                    <Col md={3.5} className="m-0 p-0">
                                        <Button
                                            variant="light ml-0 mr-2"
                                            style={{
                                                borderRadius: '5px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: 'none !important',
                                            }}
                                            onClick={() =>
                                                window.open('https://apps.apple.com/me/app/etha/id1588384989', '_blank')
                                            }
                                        >
                                            <Image
                                                className="p-0 py-0"
                                                src={`/home/app-store.svg`}
                                                alt=""
                                                height={40}
                                                width={120}
                                            />
                                        </Button>
                                    </Col>
                                    <Col md={3} className="m-0 p-0">
                                        <Button
                                            variant="light-custom m-0 p-0"
                                            style={{
                                                borderRadius: '32px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                width: '130px',
                                                justifyContent: 'center',
                                                border: 'none !important',
                                            }}
                                            onClick={() => {
                                                if (state.signedIn) {
                                                    history.push('/home');
                                                } else {
                                                    dispatch(setModalVisibility(true));
                                                }
                                            }}
                                        >
                                            <Image
                                                className="p-0 m-0 py-0"
                                                src={`/home/explore.svg`}
                                                alt=""
                                                height={20}
                                                width={30}
                                            />
                                            Explore
                                        </Button>
                                    </Col>
                                </div>
                                <div
                                    className="d-flex p-0 mr-4"
                                    style={{ cursor: 'pointer', justifyContent: 'center', width: '300px' }}
                                ></div>
                            </Col>
                        </div>
                        <div className="d-flex w-100" style={{ justifyContent: 'center' }}>
                            <ArrowForwardIos style={{ transform: 'rotate(90deg)' }} />
                        </div>
                    </Container>
                </div>
                <div className={`${styles.landing_container_light} pt-2`}>
                    <Container className="mb-0" style={{ paddingBottom: '40px' }}>
                        <div className={`${styles.testimonial_container} w-100`}>
                            <div className={`${styles.testimonial_card}`}></div>
                            <div className={`${styles.testimonial_card}`}></div>
                            <div className={`${styles.testimonial_card}`}></div>
                        </div>
                        <div className="d-flex w-100" style={{ justifyContent: 'center' }}>
                            <div className={`${styles.seperator}`} />
                        </div>
                    </Container>
                </div>
                <Footer />
            </div>
            <a
                href="https://www.producthunt.com/posts/etha?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-etha"
                target="_blank"
                rel="noreferrer"
            >
                <img
                    className="m-2"
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=337598&theme=dark"
                    alt="Etha - Transparency&#0032;&#0038;&#0032;accountability&#0032;in&#0032;news&#0032;media&#0032;&#0038;&#0032;politics | Product Hunt"
                    style={{
                        width: '250px',
                        height: '54px',
                        position: 'fixed',
                        right: '0',
                        bottom: '0',
                        zIndex: 200,
                    }}
                    width="250"
                    height="54"
                />
            </a>
            <ContactUsModal show={showJoinPage} onHide={() => setShowJoinPage(false)} />
        </>
    );
};

export default Home;
