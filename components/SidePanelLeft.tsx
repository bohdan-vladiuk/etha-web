import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { SocialIcons } from './SocialIcons';
import { useAppDispatch } from '../redux/store';
import { setContactFormVisibility } from '../redux';
import style from '../styles/SidePanelLeft.module.css';
import { ContactUsModal } from './ContactUsModal';

export const SidePanelLeft: React.FC = () => {
    const history = useRouter();
    const dispatch = useAppDispatch();
    const pathname = history.pathname;
    const [showJoinPage, setShowJoinPage] = useState<boolean>(false);

    return (
        <div
            className="d-flex px-1"
            style={{
                width: '100%',
                height: '80vh',
                position: 'sticky',
                top: '100px',
                alignItems: 'space-between',
                paddingTop: '20vh',
                flexDirection: 'column',
                textAlign: 'center',
            }}
        >
            <Button
                variant="lighter mx-3 p-0"
                style={{ textAlign: 'start', position: 'fixed', top: '100px' }}
                onClick={() => {
                    history.back();
                }}
            >
                <p
                    style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: `${pathname.includes('post/') || pathname.includes('profile/') ? '#4824D6' : '#707070'}`,
                        visibility: `${
                            pathname.includes('post/') || pathname.includes('profile/') ? 'visible' : 'hidden'
                        }`,
                    }}
                >
                    <i className="fa fa-arrow-alt-circle-left" /> Back
                </p>
            </Button>
            <Button
                variant="lighter mx-3 p-0"
                style={{ textAlign: 'start' }}
                onClick={() => {
                    history.push('/home');
                }}
            >
                <p
                    style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: `${pathname.includes('home') ? '#4824D6' : '#707070'}`,
                    }}
                >
                    <i className="fa fa-compass" /> News Reals
                </p>
            </Button>

            <Button
                variant="lighter mx-3 p-0 mb-4"
                style={{ textAlign: 'start' }}
                onClick={() => {
                    history.push('/trending');
                }}
            >
                <p
                    className="m-0 p-0"
                    style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: `${pathname.includes('trending') ? '#4824D6' : '#707070'}`,
                    }}
                >
                    <i className="fas fa-chart-line" /> Trending
                </p>
            </Button>

            <div className="w-100 mt-4" style={{ cursor: 'pointer', position: 'absolute', bottom: 0 }}>
                <div className="d-flex p-0 mt-4 mr-4" style={{ cursor: 'pointer' }}>
                    <Image
                        className="p-0 py-0 pr-2"
                        src={`/google_store.svg`}
                        alt=""
                        onClick={() =>
                            window.open('https://play.google.com/store/apps/details?id=one.etha.app', '_blank')
                        }
                        height={78}
                        width={150}
                    />
                    <Image
                        className="p-0 py-0 px-2"
                        src={`/apple_store.svg`}
                        alt=""
                        onClick={() => window.open('https://apps.apple.com/me/app/etha/id1588384989', '_blank')}
                        height={78}
                        width={150}
                    />
                </div>
                <div
                    className="d-flex px-2 mb-2"
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}
                >
                    <Button
                        variant="lighter px-1"
                        style={{ textAlign: 'start' }}
                        onClick={() => {
                            history.push('/terms-of-service');
                        }}
                    >
                        <p className="m-0 p-0" style={{ fontSize: '12px', fontWeight: 'bold' }}>
                            Terms of Service
                        </p>
                    </Button>
                    <Button
                        variant="lighter px-1"
                        style={{ textAlign: 'start' }}
                        onClick={() => {
                            history.push('/privacy-policy');
                        }}
                    >
                        <p className="m-0 p-0" style={{ fontSize: '12px', fontWeight: 'bold' }}>
                            Privacy Policy
                        </p>
                    </Button>
                    <Button
                        variant="lighter px-1"
                        style={{ textAlign: 'start' }}
                        onClick={() => {
                            history.push('/about-us');
                        }}
                    >
                        <p className="m-0 p-0" style={{ fontSize: '12px', fontWeight: 'bold' }}>
                            About
                        </p>
                    </Button>
                    <Button
                        variant="lighter px-1"
                        style={{ textAlign: 'start' }}
                        onClick={() => {
                            dispatch(setContactFormVisibility(true));
                            setShowJoinPage(true);
                        }}
                    >
                        <p className="m-0 p-0" style={{ fontSize: '12px', fontWeight: 'bold' }}>
                            Contact Us
                        </p>
                    </Button>
                </div>
            </div>
            <ContactUsModal show={showJoinPage} onHide={() => setShowJoinPage(false)} />
        </div>
    );
};
export default SidePanelLeft;
