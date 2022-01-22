import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { ContactUsModal } from '../components/ContactUsModal';

const Home: NextPage = () => {
    const [showJoinPage, setShowJoinPage] = useState<boolean>(false);

    return (
        <div className={styles.container}>
            <div className={styles.landing_container}>
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
                            One app that says the truth
                        </p>
                        <p style={{ fontSize: '16px', fontWeight: '200' }}>
                            A gamified, objective discourse is needed to make democracy withstand the onslaught of media
                            manipulation and extreme voter polarization.
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
    );
};

export default Home;
