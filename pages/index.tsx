import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { ContactUsModal } from '../components/ContactUsModal';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const history = useRouter();
    const [showJoinPage, setShowJoinPage] = useState<boolean>(false);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.landing_container}>
                    <div className={`${styles.logo}`}>
                        <Image
                            onClick={() => {
                                history.push('/');
                            }}
                            height={25}
                            width={25}
                            src="/logo.svg"
                        />
                    </div>
                    <div className={`${styles.landing_details} d-flex justify-content-center`}>
                        <div style={{ width: '75%', paddingBottom: '20px' }}>
                            <p
                                style={{
                                    fontSize: '8.5vh',
                                    fontWeight: 'bold',
                                    lineHeight: '8vh',
                                    wordBreak: 'normal',
                                }}
                            >
                                The Future is here
                            </p>
                            <p style={{ fontSize: '16px', fontWeight: '200' }}>
                                Introducing Etha - your favorite resource for the stories that really matter,{'\n'}
                                fact backed information and true freedom of expression.
                            </p>
                            <div
                                className={styles.landing_btn}
                                onClick={() => {
                                    setShowJoinPage(true);
                                }}
                            >
                                <p className="m-0" style={{ color: 'white', padding: '15px 40px' }}>
                                    Join waitlist
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.landing_image}>
                        <Image src="/landing1.svg" alt="" height={600} width={600} />
                    </div>
                </div>
                <ContactUsModal show={showJoinPage} onHide={() => setShowJoinPage(false)} />
            </div>
        </>
    );
};

export default Home;
