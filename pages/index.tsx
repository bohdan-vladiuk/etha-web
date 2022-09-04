import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { NavBar } from '../components/NavBar';
import { ContactUsModal } from '../components/ContactUsModal';
import { Footer } from '../components/Footer';
import { Button, Carousel, Col, Container } from 'react-bootstrap';
import { ArrowForwardIos } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { faqs, featurePoints, carousels, less_biases } from '../models/Web';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { ImQuotesLeft } from 'react-icons/im';
import { SubscribeToNewsLetter } from '../models';
import { SubscribeNewsletter } from '../middleware';
import { stylesheetInclude } from 'sitemap/dist/lib/sitemap-stream';

const Home: NextPage = () => {
    const [showJoinPage, setShowJoinPage] = useState<boolean>(false);
    const segment1 = getFeaturePointsUI(1);
    const segment2 = getFeaturePointsUI(2);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [carouselImageId, setCarouselImageId] = useState(0);
    const [email, setEmail] = useState('');
    const history = useRouter();

    function handleCarouselSelect() {
        if (carouselIndex === 0) {
            setCarouselIndex(1);
        } else {
            setCarouselIndex(0);
        }
    }

    function handleCarouselImageSelect(increase: number) {
        const imageID = carouselImageId + increase;
        if (imageID > 7) {
            setCarouselImageId(0);
        } else if (imageID < 0) {
            setCarouselImageId(7);
        } else {
            setCarouselImageId(imageID);
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
            <NavBar />
            <div className={styles.container}>
                <div className={`${styles.landing_container}`}>
                    <Container className="mb-0" style={{ paddingBottom: '40px', paddingTop: '120px' }}>
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
                                    <Image
                                        src="/home/iphone-4.png"
                                        layout="fill"
                                        objectFit="contain"
                                        alt="etha-mobile"
                                    />
                                </div>
                            </Col>
                            <Col lg={7}>
                                <h1 className={styles.home_header}>Let&apos;s Fix the System</h1>
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
                        <div className={`${styles.dark_container} mt-5`}>
                            <Col md={12} lg={6} className={styles.text_wrapper}>
                                <h1 className={styles.light_header}>
                                    We care how you feel about news biasness and misinformation
                                </h1>
                                <p className={styles.light_content}>
                                    Almost two-thirds of the people in the U.S. are stressed by the news. we are
                                    helplessness and hopelessness in the face of diverse misinformation and our civic
                                    engagement inevitably suffer.
                                </p>
                            </Col>
                            <Col md={6} className="my-0 py-0">
                                <div style={{ width: '100%', height: '535px', position: 'relative' }}>
                                    <Image src="/home/iphone-2.png" layout="fill" objectFit="cover" alt="iphone-2" />
                                </div>
                            </Col>
                        </div>
                        <div className={styles.biased_content_container}>
                            {less_biases.map((img) => (
                                <div className={styles.biased_content} key={img.id}>
                                    <Image
                                        src={img.filename}
                                        alt="Get less-biased content at all times"
                                        objectFit="contain"
                                        width={img.width}
                                        height={img.height}
                                    />
                                    <div className={styles.biased_comment}>
                                        <p>Get less-biased content at all times</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="d-flex w-100 my-5 py-5" style={{ justifyContent: 'center' }}>
                            <div className={`${styles.seperator}`} />
                        </div>
                        <div className={`${styles.black_container}`} style={{ marginTop: '30px' }}>
                            <Col md={12} lg={6} className={styles.text_wrapper}>
                                <h1 className={styles.light_header}>A Safe Place for free expression </h1>
                                <p className={styles.light_content}>
                                    Almost two-thirds of the people in the U.S. are stressed by the news. We are
                                    helpless and hopeless in the face of diverse misinformation and our civic engagement
                                    inevitably suffer,
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
                                    <Col xs={6} md={3} lg={4} className="ml-1 p-0">
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
                            <Col md={6} style={{ height: '400px !important' }}>
                                <div style={{ width: '100%', height: '400px', position: 'relative' }}>
                                    <Image src="/home/iphone-3.png" layout="fill" objectFit="contain" alt="iphone-3" />
                                </div>
                            </Col>
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
                                                        <Image
                                                            src="/home/check.svg"
                                                            layout="fill"
                                                            objectFit="cover"
                                                            alt="check"
                                                        />
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
                                                        <Image
                                                            src="/home/check.svg"
                                                            layout="fill"
                                                            objectFit="cover"
                                                            alt="check"
                                                        />
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
                            <Button
                                variant="carousel"
                                style={{ padding: '10px 11px 14px 9px' }}
                                onClick={handleCarouselSelect}
                            >
                                <IoIosArrowBack />
                            </Button>
                            <Button
                                variant="carousel"
                                style={{ padding: '10px 9px 14px 11px' }}
                                onClick={handleCarouselSelect}
                            >
                                <IoIosArrowForward />
                            </Button>
                        </div>
                        <div className="d-flex w-100 mt-5" style={{ justifyContent: 'center' }}>
                            <div className={`${styles.seperator}`} />
                        </div>
                        <div
                            className="d-flex w-100 my-5"
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
                        </div>
                        <div className={styles.carousel_container}>
                            <Carousel
                                className={styles.image_carousel}
                                indicators={false}
                                interval={3000}
                                activeIndex={carouselImageId}
                            >
                                {carousels.map((img, index) => (
                                    <Carousel.Item key={index}>
                                        <Image
                                            src={img.filename}
                                            width={img.width}
                                            height={img.height}
                                            alt="Carousel Image"
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                        <div className="d-flex w-100" style={{ justifyContent: 'center' }}>
                            <Button
                                variant="carousel"
                                style={{ padding: '10px 11px 14px 9px' }}
                                onClick={() => handleCarouselImageSelect(-1)}
                            >
                                <IoIosArrowBack />
                            </Button>
                            <Button
                                variant="carousel"
                                style={{ padding: '10px 9px 14px 11px' }}
                                onClick={() => handleCarouselImageSelect(1)}
                            >
                                <IoIosArrowForward />
                            </Button>
                        </div>
                        <div className="d-flex w-100 my-4 py-4" style={{ justifyContent: 'center' }}>
                            <div className={`${styles.seperator}`} />
                        </div>
                        <div className="w-100">
                            <h1 className={`${styles.home_header_secondary} mb-5`}>Facts &amp; Questions</h1>
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
                <div className={styles.image_wrapper}>
                    <Image
                        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=337598&theme=dark"
                        alt="Etha - Transparency&#0032;&#0038;&#0032;accountability&#0032;in&#0032;news&#0032;media&#0032;&#0038;&#0032;politics | Product Hunt"
                        width="250"
                        height="54"
                    />
                </div>
            </a>
            <ContactUsModal show={showJoinPage} onHide={() => setShowJoinPage(false)} />
        </>
    );
};

export default Home;
