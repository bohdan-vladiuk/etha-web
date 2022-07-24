import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { NavBar } from '../components/NavBar';
import { Page } from '../components/PageComponent';
import { ContactUsModal } from '../components/ContactUsModal';
import { CustomButton } from '../components/Button.component';
import { Footer } from '../components/Footer';
import { Button, Carousel, CarouselItem, Col, Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { setModalVisibility } from '../redux';
import { faqs, featurePoints } from '../models/Web';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { ImQuotesLeft } from 'react-icons/im';
import { TextField } from '@mui/material';
import { SubscribeToNewsLetter } from '../models';
import { SubscribeNewsletter } from '../middleware';
import Head from 'next/head';

const featureList = [
    {
        title: 'View Profiles and Current Ratings of Politicians',
        image: '/home/features/4.png',
    },
    {
        title: 'Agree and Disagree with statements made by politicians',
        image: '/home/features/3.png',
    },
    {
        title: 'Share your Political Views',
        image: '/home/features/1.png',
    },
    {
        title: 'See the latest topics and trends',
        image: '/home/features/2.png',
    },
];

const Home: NextPage = () => {
    const [showJoinPage, setShowJoinPage] = useState<boolean>(false);
    // const [showJoinButton, setShowJoinButton] = useState<boolean>(false);
    // const [opacity, setOpacity] = useState(0.0);
    const segment1 = getFeaturePointsUI(1);
    const segment2 = getFeaturePointsUI(2);
    const state = useAppSelector((reduxState) => ({
        signedIn: reduxState.userReducer.signed_in,
    }));
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [email, setEmail] = useState('');
    const history = useRouter();
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     if (state.signedIn) {
    //         history.push('/home');
    //     }
    // }, [state.signedIn]);
    // useEffect(() => {
    //     const win: Window = window;
    //     const onScroll: EventListener = (event: Event) => {
    //         if (document.body.scrollTop >= win.innerHeight) {
    //             setOpacity((opacity) => (opacity > 1 ? 1 : opacity + 0.2));
    //             setShowJoinButton(true);
    //         } else {
    //             setOpacity((opacity) => (opacity <= 0 ? 0 : opacity - 0.2));
    //             opacity === 0 && setShowJoinButton(false);
    //         }
    //     };

    //     win.addEventListener('scroll', onScroll);
    //     win.addEventListener('wheel', onScroll);

    //     return () => {
    //         window.removeEventListener('scroll', onScroll);
    //         window.removeEventListener('wheel', onScroll);
    //     };
    // }, [opacity]);

    function handleCarouselSelect() {
        if (carouselIndex === 0) {
            setCarouselIndex(1);
        } else {
            setCarouselIndex(0);
        }
    }

    function getFeaturePointsUI(segment: number) {
        const endLoop = segment * 4;
        var list = [];
        for (var i = (segment - 1) * 4; i < endLoop; i++) {
            list.push(featurePoints[i]);
        }
        return list;
    }

    function handleKeyPress(target: React.KeyboardEvent) {
        if (target.key === 'Enter') {
            handleSubscribe();
        }
    }
    function validateEmail(testMail: string): boolean {
        const re = /\S+@\S+\.\S+/;
        return re.test(testMail);
    }

    function handleSubscribe() {
        if (email.length > 0 && validateEmail(email)) {
            const subscribeNewsletter: SubscribeToNewsLetter = {
                name: '',
                email: email,
                message: 'Subscribe',
            };
            SubscribeNewsletter(subscribeNewsletter, () => {
                alert('Submitted your request to subscribe to our newsletter');
                setEmail('');
            });
        } else {
            alert('Please Enter Valid Email to Subscribe');
        }
    }

    return (
        <>
            <Head>
                <meta name="keywords" content="politics,latest politician statements,political polls" />
            </Head>
            {/* {showJoinButton && <NavBar />} */}
            <div className={styles.container}>
                <div className={`${styles.landing_container}`}>
                    <Container className="mb-0" style={{ paddingBottom: '40px' }}>
                        <div
                            className="d-flex w-100"
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}
                        >
                            <Col lg={5}>
                                <div style={{ width: '100%', height: '70vh', position: 'relative' }}>
                                    <Image src="/home/iphone-1.png" layout="fill" objectFit="contain" />
                                </div>
                            </Col>
                            <Col lg={7}>
                                <h1 className={styles.home_header}>Let&lsquo;s Fix the System</h1>
                                <p className={styles.home_content_grey}>
                                    Introducing Etha - your new favorite interactive social news platform, which helps
                                    you hold politicians accountable.
                                </p>
                                <div
                                    className="d-flex p-0 mt-4 mr-4"
                                    style={{ cursor: 'pointer', alignItems: 'center', flexWrap: 'wrap' }}
                                >
                                    <Col md={3.5} className="mt-2 p-0">
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
                                    <Col md={3.5} className="mt-2 p-0">
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
                                    <Col md={3} className="mt-2 p-0">
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
                                                history.push('/home');
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
                        <div className={`${styles.testimonial_container} w-100 d-none d-md-flex`}>
                            <div className={`${styles.testimonial_card}`}>
                                <div className="d-flex w-100 py-3">
                                    <div
                                        style={{
                                            verticalAlign: 'top',
                                            alignContent: 'start',
                                            fontSize: '50px',
                                            width: '70px',
                                            marginRight: '10px',
                                        }}
                                    >
                                        <ImQuotesLeft style={{ verticalAlign: 'top' }} />
                                    </div>
                                    <div className={`${styles.testimonial_content}`}>
                                        When you feel oblivious and detached from the political domian
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.testimonial_card}`}>
                                <div className="d-flex w-100 py-3">
                                    <div
                                        style={{
                                            verticalAlign: 'top',
                                            alignContent: 'start',
                                            fontSize: '50px',
                                            width: '70px',
                                            marginRight: '10px',
                                        }}
                                    >
                                        <ImQuotesLeft style={{ verticalAlign: 'top' }} />
                                    </div>

                                    <div className={`${styles.testimonial_content}`}>
                                        When news anxiety leads to feelings of helplessness and hopelessness
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.testimonial_card}`}>
                                <div className="d-flex w-100 py-3">
                                    <div
                                        style={{
                                            verticalAlign: 'top',
                                            alignContent: 'start',
                                            fontSize: '50px',
                                            width: '70px',
                                            marginRight: '10px',
                                        }}
                                    >
                                        <ImQuotesLeft style={{ verticalAlign: 'top' }} />
                                    </div>

                                    <div className={`${styles.testimonial_content}`}>
                                        Our civic engagement and democracy inevitably will also suffer.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" d-flex w-100 d-md-none" style={{ flexWrap: 'wrap' }}>
                            <div className={`${styles.testimonial_card}`}>
                                <div className="d-flex w-100 py-3">
                                    <div
                                        style={{
                                            verticalAlign: 'top',
                                            alignContent: 'start',
                                            fontSize: '50px',
                                            width: '70px',
                                            marginRight: '10px',
                                        }}
                                    >
                                        <ImQuotesLeft style={{ verticalAlign: 'top' }} />
                                    </div>

                                    <div className={`${styles.testimonial_content}`}>
                                        When you feel oblivious and detached from the political domian
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.testimonial_card}`}>
                                <div className="d-flex w-100 py-3">
                                    <div
                                        style={{
                                            verticalAlign: 'top',
                                            alignContent: 'start',
                                            fontSize: '50px',
                                            width: '70px',
                                            marginRight: '10px',
                                        }}
                                    >
                                        <ImQuotesLeft style={{ verticalAlign: 'top' }} />
                                    </div>
                                    <div className={`${styles.testimonial_content}`}>
                                        When news anxiety leads to feelings of helplessness and hopelessness
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.testimonial_card}`}>
                                <div className="d-flex w-100 py-3">
                                    <div
                                        style={{
                                            verticalAlign: 'top',
                                            alignContent: 'start',
                                            fontSize: '50px',
                                            width: '70px',
                                            marginRight: '10px',
                                        }}
                                    >
                                        <ImQuotesLeft style={{ verticalAlign: 'top' }} />
                                    </div>
                                    <div className={`${styles.testimonial_content}`}>
                                        Our civic engagement and democracy inevitably will also suffer.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex w-100 mt-2 mb-2" style={{ justifyContent: 'center' }}>
                            <div className={`${styles.seperator}`} />
                        </div>
                        <div
                            className="d-flex w-100 my-5 py-5"
                            style={{ alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}
                        >
                            <h1 className={styles.home_header_secondary}>
                                Participate in free, open and global conversations with healthy discourse
                            </h1>
                            <p className={`${styles.home_content_small}`}>
                                Almost two-thirds of the people in the U.S. are stressed by the news. we are
                                helplessness and hopelessness in the face of diverse misinformation and our civic
                                engagement inevitably suffers.
                            </p>
                        </div>{' '}
                        <div className="d-flex w-100 mt-2 mb-2" style={{ justifyContent: 'center' }}>
                            <div className={`${styles.seperator}`} />
                        </div>
                        <div className={`${styles.black_container}`}>
                            <Col md={12} lg={6} className="pl-4">
                                <h1 className={styles.light_header}>
                                    We care how you feel about your politicians and they should too.
                                </h1>
                                <p className={styles.light_content}>
                                    Introducing Etha - your new favorite interactive social news platform, which helps
                                    you hold politicians accountable.Almost two-thirds of the people in the U.S. are
                                    stressed by the news.
                                </p>
                                <div
                                    className="d-flex p-0 mt-4 mb-3"
                                    style={{ cursor: 'pointer', alignItems: 'center', flexWrap: 'wrap' }}
                                >
                                    <Col xs={6} md={3} lg={4} className="m-0 p-0">
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
                                    <Col xs={6} md={3} lg={4} className="m-0 p-0">
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
                                </div>
                            </Col>
                            <Col md={6} className="my-0 py-0">
                                <div style={{ width: '100%', height: '50vh', position: 'relative' }}>
                                    <Image src="/home/iphone-3.png" layout="fill" objectFit="cover" />
                                </div>
                            </Col>
                        </div>
                        {/* <div className={`${styles.landing_container_light} pt-5 mt-5`}>
                            {featureList.map((feature) => {
                                return (
                                    <Col
                                        className="d-flex w-100 px-2 py-3"
                                        style={{ alignItems: 'center', flexDirection: 'column' }}
                                        md={6}
                                        key={feature.title}
                                    >
                                        <Image src={feature.image} width="70%" />
                                        <div className={`${styles.feature_text_container}`}>{feature.title}</div>
                                    </Col>
                                );
                            })}
                        </div> */}
                        <div className="d-flex w-100 my-5 py-5" style={{ justifyContent: 'center' }}>
                            <div className={`${styles.seperator}`} />
                        </div>
                        <Carousel
                            indicators={false}
                            interval={3000}
                            controls={false}
                            fade
                            className="w-100 mt-4"
                            activeIndex={carouselIndex}
                        >
                            <Carousel.Item
                                className="d-flex w-100"
                                style={{ justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}
                            >
                                {segment1.map((featurePoint, index) => {
                                    return (
                                        <Col key={`fp-${index}`} className={`${styles.feature_point_container}`} sm={6}>
                                            <div className={`${styles.feature_point}`}>
                                                <div className={`${styles.checkmark}`}>
                                                    <div style={{ width: 'auto', height: '4vh', position: 'relative' }}>
                                                        <Image src="/home/check.svg" layout="fill" objectFit="cover" />
                                                    </div>
                                                </div>
                                                <div className={`${styles.feature_point_content}`}>{featurePoint}</div>
                                            </div>
                                        </Col>
                                    );
                                })}
                            </Carousel.Item>
                            <Carousel.Item
                                className="d-flex w-100"
                                style={{ justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}
                            >
                                {segment2.map((featurePoint, index) => {
                                    return (
                                        <Col key={`fp-${index}`} className={`${styles.feature_point_container}`} sm={6}>
                                            <div className={`${styles.feature_point}`}>
                                                <div className={`${styles.checkmark}`}>
                                                    <div style={{ width: 'auto', height: '4vh', position: 'relative' }}>
                                                        <Image src="/home/check.svg" layout="fill" objectFit="cover" />
                                                    </div>
                                                </div>
                                                <div className={`${styles.feature_point_content}`}>{featurePoint}</div>
                                            </div>
                                        </Col>
                                    );
                                })}
                            </Carousel.Item>
                        </Carousel>
                        <div className="d-flex w-100" style={{ justifyContent: 'center' }}>
                            <Button variant="carousel" onClick={handleCarouselSelect}>
                                <IoIosArrowBack />
                            </Button>
                            <Button variant="carousel" onClick={handleCarouselSelect}>
                                <IoIosArrowForward />
                            </Button>
                        </div>
                        <div className="d-flex w-100 my-5 py-5" style={{ justifyContent: 'center' }}>
                            <div className={`${styles.seperator}`} />
                        </div>
                        <div className={`${styles.dark_container}`} style={{ marginTop: '30px' }}>
                            <Col md={12} lg={6} className="px-4 pt-5">
                                <h1 className={styles.light_header}>A Safe Place for free expression </h1>
                                <p className={styles.light_content}>
                                    Almost two-thirds of the people in the U.S. are stressed by the news. We are
                                    helpless and hopeless in the face of diverse misinformation and our civic engagement
                                    inevitably suffer,
                                </p>
                                <div
                                    className="d-flex w-100"
                                    style={{
                                        background: '#f9f9f9',
                                        borderRadius: '15px',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <TextField
                                        name="email"
                                        className="p-1"
                                        style={{ width: '80%' }}
                                        placeholder="E-Mail Address"
                                        label="Sign Up for our Newsletter"
                                        variant="standard"
                                        value={email}
                                        onKeyPress={handleKeyPress}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Button
                                        variant="carousel"
                                        style={{ background: '#4221c4', color: '#fff', height: '50px' }}
                                        onClick={handleSubscribe}
                                    >
                                        <IoIosArrowForward />{' '}
                                    </Button>
                                </div>
                            </Col>
                            <Col md={6} style={{ height: '400px !important' }}>
                                <div style={{ width: '100%', height: '400px', position: 'relative' }}>
                                    <Image src="/home/iphone-2.png" layout="fill" objectFit="contain" />
                                </div>
                            </Col>
                        </div>
                        <div className="d-flex w-100 my-5 py-5" style={{ justifyContent: 'center' }}>
                            <div className={`${styles.seperator}`} />
                        </div>
                        <div className="w-100">
                            <h1 className={`${styles.home_header_secondary} mb-5`}>Frequently Asked Questions</h1>
                            {faqs.map((faq, index) => {
                                return (
                                    <Col className={`${styles.faq_container}`} lg={12} key={index}>
                                        <div className={`${styles.faq_header}`}>{faq.question}</div>
                                        <div className={`${styles.faq_answer} mt-4 mb-3`}>{faq.answer}</div>
                                    </Col>
                                );
                            })}
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
