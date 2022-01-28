import { useState } from 'react';
import type { NextPage } from 'next';

import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { NavBar } from '../components/NavBar';
import { Page } from '../components/PageComponent';
import { ContactUsModal } from '../components/ContactUsModal';
import { useRouter } from 'next/router';
import { CustomButton } from '../components/Button.component';
import { CustomInput } from '../components/Input';
import { Footer } from '../components/Footer';

const Home: NextPage = () => {
    const [showJoinPage, setShowJoinPage] = useState<boolean>(false);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');

    
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

    return (
        <>
            <div className={styles.container} onMouseDown={() => ''}>
                <NavBar />

                <Page
                    header="The Future is here"
                    image="landing1"
                    details={[
                        'Introducing Etha - your favorite resource for the stories that really matter, fact backed information and true freedom of expression.',
                    ]}
                    button={{ placeHolder: 'Join waitlist', click: () => setShowJoinPage(true) }}
                />
                <Page
                    header="An innovative way to get your information"
                    image="iPhone1"
                    details={pageTextData.pageOne}
                    checked
                    reversed
                    bg="#CACAF375"
                />
                <Page
                    header="Healthy conversations without bias"
                    image="iPhone2"
                    details={pageTextData.pageTwo}
                    checked
                    bg="#f9f7ff"
                />
                <Page header="A safe place for free expression." image="Page3" details={pageTextData.pageThree} />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: '100vh',
                        padding: '0 10vh',
                        width: '100%',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            right: '0',

                            height: '100%',
                            width: '75%',

                            zIndex: 1,
                            padding: '80px 0',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#F9F7FF',
                                height: '100%',
                                borderRadius: '30px',
                            }}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            width: '80%',
                            zIndex: 10,
                        }}
                    >
                        <Image className="p-0 m-0" src={`/PostGroup.svg`} alt="" height={631} width={631} />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            height: '100%',
                            width: '100%',
                            zIndex: 10,
                            fontSize: '5vh',
                            lineHeight: '6vh',
                            fontWeight: '700',
                            padding: '0 20px',
                        }}
                    >
                        <p>With an innovative fact-checking process for an extra layer of accountablity</p>
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '100vh',
                        width: '100%',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            padding: '40px 160px 18%',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#F9F7FF',
                                height: '100%',
                                borderRadius: '30px',
                            }}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            height: '50%',
                            width: '55%',
                            zIndex: 10,
                            fontSize: '5vh',
                            fontWeight: '700',
                        }}
                    >
                        <p>Daily coverage. Delivered straight to you.</p>
                        <p style={{ fontSize: '14px', fontWeight: '300' }}>
                            We fact check, cross reference and keep you up to date with your favorite stories so you can
                            focus on investing in yourself, staying informed, and getting involved.
                        </p>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            width: '60%',
                            zIndex: 10,
                        }}
                    >
                        <Image className="p-0 m-0" src={`/iPhone3.svg`} alt="" height={531} width={1125} />
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                        width: '100%',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            height: '50%',
                            width: '55%',
                            zIndex: 10,
                            fontSize: '5vh',
                            padding: '0 0 60px',
                            fontWeight: '700',
                        }}
                    >
                        <p>Using facts to bring an end to polarization.</p>
                        <p style={{ fontSize: '14px', fontWeight: '300' }}>
                            Polarization in the media doesn’t emphasize commonalities, it weaponizes differences. Etha
                            changes that by focusing on the facts to keep you educated and focus on the things that
                            matter to you.
                        </p>
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '100vh',
                        width: '100%',
                        backgroundColor: '#152649',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            textAlign: 'center',
                            height: '100%',
                            width: '55%',
                            margin: '80px 0',
                            zIndex: 10,
                            fontSize: '5vh',
                            lineHeight: '5vh',
                            color: '#ffffff',
                            fontWeight: '700',
                        }}
                    >
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
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            height: '50%',
                            width: '70%',
                            zIndex: 10,
                            fontSize: '5vh',
                            lineHeight: '5vh',
                            padding: '60px',
                            backgroundColor: '#F9F7FF',
                            borderRadius: '30px',
                            fontWeight: '700',
                            transform: 'translateY(-100px)',
                        }}
                    >
                        <div style={{ padding: '40px', width: '100%' }}>
                            <p>Subscribe to our newsletter today!</p>
                            <p style={{ fontSize: '0.8rem', fontWeight: '300', lineHeight: '1rem' }}>
                                Sign up to receive free daily briefings and newsletters, curated by Etha
                            </p>
                        </div>
                        <div
                            style={{
                                backgroundColor: '#ffffff',
                                width: '100%',
                                padding: '40px',
                                borderRadius: '10px',
                                boxShadow: '0px 3px 24px rgba(234, 234, 234, 0.25)',
                            }}
                        >
                            <CustomInput label="Fullname" type="text" placeHolder="" val={(e) => setFullname(e)} />
                            <CustomInput label="Email address" type="email" placeHolder="" val={(e) => setEmail(e)} />
                            <CustomButton
                                placeHolder="Subscribe to Newsletter"
                                width="100%"
                                click={() => {
                                    alert(`${fullname} ${email}`);
                                    setFullname('');
                                    setEmail('');
                                }}
                            />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            <ContactUsModal show={showJoinPage} onHide={() => setShowJoinPage(false)} />
        </>
    );
};

export default Home;
