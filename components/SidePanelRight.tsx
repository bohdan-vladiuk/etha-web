import { useRouter } from 'next/router';
import React from 'react';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { SocialIcons } from './SocialIcons';
import { useAppDispatch } from '../redux/store';
import { setContactFormVisibility } from '../redux';
import style from '../styles/SidePanelLeft.module.css';

export const SidePanelRight: React.FC = () => {
    const history = useRouter();
    const dispatch = useAppDispatch();
    return (
        <div
            className="d-flex px-4"
            style={{
                width: '100%',
                height: '80vh',
                position: 'sticky',
                top: '100px',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
            }}
        >
            <div style={{ cursor: 'pointer' }}>
                <Image
                    className={``}
                    src="/logo.svg"
                    height={250}
                    width={250}
                    alt=""
                    onClick={() => history.push('/home')}
                />
            </div>
            <h5>More Features Coming Soon...Stay Tuned!!!</h5>
            <SocialIcons />
        </div>
    );
};
export default SidePanelRight;
