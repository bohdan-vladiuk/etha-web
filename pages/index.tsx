import { useState } from 'react';
import type { NextPage } from 'next';

import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { NavBar } from '../components/NavBar';
import { Page } from '../components/PageComponent';
import { ContactUsModal } from '../components/ContactUsModal';
import { useRouter } from 'next/router';
import { CustomButton } from '../components/Button.component';

const Home: NextPage = () => {
    const [showJoinPage, setShowJoinPage] = useState<boolean>(false);
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
            <div className={styles.container}>
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
                        alignItems: "center",
                        height: '100vh',
                        width: '100%'

                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            right: '0',
                            
                            height: '100%',
                            width: '75%',
                            
                            zIndex: 1,
                            padding: "40px 0"
                        }}
                    >
                        <div style={{display: "flex", alignItems: "center", backgroundColor: '#F9F7FF', height: "100%", borderRadius: '50px',}}/>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            width: '100%',
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
                            fontWeight: '600',

                        }}
                    >
                        <p>With an innovative fact-checking process for an extra layer of accountablity</p>
                    </div>
                </div>
            </div>
            <ContactUsModal show={showJoinPage} onHide={() => setShowJoinPage(false)} />
        </>
    );
};

export default Home;
