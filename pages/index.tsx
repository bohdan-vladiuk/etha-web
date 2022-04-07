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

const Home: NextPage = () => {
    const history = useRouter();
    const [showJoinPage, setShowJoinPage] = useState<boolean>(false);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');

    const [opacity, setOpacity] = useState(0.0);

    const [showJoinButton, setShowJoinButton] = useState<boolean>(false);

    const pageTextData = {
        pageOne: [
            'Stay up to date with breaking news, top national and local newspapers',
            'Access the world’s best journalism from trusted sources',
            'Top and fact checked stories chosen by editors, personalized for you',
            'Live stream of content in an interactive application',
            'Personalized daily briefings for a curated experience',
        ],
        pageTwo: [
            'Participate in free, open and global conversations with healthy discourse.',
            'Freedom to connect with others, control your conversations, and we’re here to fact check when you need us.',
            'Safe, inclusive, and authentic conversations.',
            'We use our technology to limit the distribution and reach of harmful or misleading information so you don’t have to.',
        ],
        pageThree: [
            'We don’t take sides. Our focus is on the truth and accountability in order to keep everyone equiped with factual and science backed information.',
        ],
    };

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
                <NavBar />
                <Page
                    header="The Future is here"
                    image="landing1"
                    details={[
                        'Introducing Etha - your favorite resource for the stories that really matter, fact backed information and true freedom of expression.',
                    ]}
                    storeButton={() => ''}
                    titleSize
                />
                <ComingSoon />
                <Page
                    header="An innovative way to get your information"
                    image="iPhone1"
                    details={pageTextData.pageOne}
                    checked
                    reversed
                    bg="#bdbdf575"
                />
                <Page
                    header="Healthy conversations without bias"
                    image="iPhone2"
                    details={pageTextData.pageTwo}
                    checked
                    bg="#bdbdf575"
                />
                <Page
                    header="A safe place for free expression."
                    image="Page3"
                    details={pageTextData.pageThree}
                    button={{ placeHolder: 'The Briefings', click: () => '' }}
                />
                <div className={styles.page_container}>
                    <div className={styles.page_background_container}>
                        <div className={styles.page_background} />
                    </div>
                    <div className={styles.page_image}>
                        <Image className="p-0 m-0" src={`/PostGroup.jpg`} alt="" height={766} width={705} />
                    </div>
                    <div className={styles.page_font}>
                        <p className="p-0 m-0 px-2">
                            With an innovative fact-checking process for an extra layer of accountablity
                        </p>
                    </div>
                </div>
                <div className={`${styles.page3_container}`}>
                    {/* <div className={styles.page_background2_container}>
                        <div className={styles.page_background2} />
                    </div> */}
                    <div
                        className={``}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            width: '100%',
                            zIndex: 10,
                            fontSize: '2rem',
                            lineHeight: '2rem',
                            fontWeight: 700,
                        }}
                    >
                        <p>Daily coverage. Delivered straight to you.</p>
                        <p style={{ fontSize: '0.8rem', fontWeight: '300', lineHeight: '1.2rem', width: '50%' }}>
                            We fact check, cross reference and keep you up to date with your favorite stories so you can
                            focus on investing in yourself, staying informed, and getting involved.
                        </p>
                    </div>
                    <div className={styles.page_image2}>
                        <Image className="p-0 m-0" src={`/iPhone4.svg`} alt="" height={531} width={1125} />
                    </div>
                    <div
                        className={``}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            width: '100%',
                            zIndex: 10,
                            fontSize: '2rem',
                            lineHeight: '2rem',
                            fontWeight: 700,
                        }}
                    >
                        <p>Using facts to bring an end to polarization.</p>
                        <p style={{ fontSize: '0.8rem', fontWeight: '300', lineHeight: '1.2rem', width: '50%' }}>
                            Polarization in the media doesn’t emphasize commonalities, it weaponizes differences. Etha
                            changes that by focusing on the facts to keep you educated and focus on the things that
                            matter to you.
                        </p>
                    </div>
                </div>

                <div className={`d-flex w-100 justify-content-center my-5`}>
                    <Image className="p-0 m-0" src={`/PostGroup2.jpg`} alt="" height={631} width={1025} />
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
