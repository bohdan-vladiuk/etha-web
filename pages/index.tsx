import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { NavBar } from '../components/NavBar';
import { Page } from '../components/PageComponent';
import { ContactUsModal } from '../components/ContactUsModal';
import { CustomButton } from '../components/Button.component';
import { Footer } from '../components/Footer';

const Home: NextPage = () => {
    const [showJoinPage, setShowJoinPage] = useState<boolean>(false);
    const [opacity, setOpacity] = useState(0.0);

    const [showJoinButton, setShowJoinButton] = useState<boolean>(false);

    const pageTextData = {
        pageOne: [
            'Stay up to date with what politicians are saying about current events.',
            'Access to LeaderQ scores for politicians, which is their public approval rating (think of this as a report card for politicians)  ',
            'Users Interact with the statements made by politicians to impact their LeaderQ score and hold them accountable.',
            'Real-time representation of news and people’s opinions on politicians and specific subjects and policies.',
            'Verified, aggregated news from more than 10000+ media channels',
        ],
        pageTwo: [
            'Participate in free, open and global conversations with healthy discourse.',
            'Conversations tie into the politician’s LeaderQ score, making them more or less popular over time.',
            'Help people find the middle-ground between ideologies and mitigate political polarization.',
            'We use our technology to limit the distribution and reach of harmful or misleading information so you don’t have to.',
            'Making sure you get less-biased content at all times.',
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
                    header="Let's Fix the System"
                    image="landing1"
                    details={[
                        'Introducing Etha – your new favorite interactive social news platform, which helps you hold politicians accountable and mitigates the spread of misinformation.',
                    ]}
                    storeButton={() => ''}
                    titleSize
                />
                <Page
                    header="An Innovative way to hold politicians accountable"
                    image="iPhone1"
                    details={pageTextData.pageOne}
                    checked
                    reversed
                    bg="#bdbdf575"
                />
                <Page
                    header="A Safe Place for free expression "
                    image="iPhone2"
                    details={pageTextData.pageTwo}
                    checked
                    bg="#bdbdf575"
                />
                <div className="d-flex flex-column align-items-center" style={{ backgroundColor: '#152649' }}>
                    <div className={styles.page_font3}>
                        <p>
                            Join our community to get early access and a better way to hold your politicians accountable
                        </p>
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

                <div className="d-none d-lg-flex justify-content-center">
                    <Footer />
                </div>
                {showJoinButton && (
                    <div
                        className="d-lg-none d-md-flex m-0 px-2 py-2 d-flex align-items-center fixed-bottom"
                        style={{ backgroundColor: '#fff', opacity: `${opacity}`, justifyContent: 'space-evenly' }}
                    >
                        <CustomButton
                            placeHolder="Give Feedback"
                            width="45%"
                            click={() => {
                                setShowJoinPage(true);
                            }}
                        />
                        <CustomButton
                            placeHolder="Invest Now"
                            width="45%"
                            click={() => {
                                window.open('https://wefunder.com/etha.one', '_blank');
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
