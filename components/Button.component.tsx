// Dependencies
import React from 'react';
import { Modal } from 'react-bootstrap';
import Image from 'next/image';
import styles from '../styles/Button.module.css';

interface ButtonProps {
    placeHolder: string;
    click?: () => void;
}

export const CustomButton: React.FC<ButtonProps> = (props: ButtonProps) => {
    const { placeHolder, click } = props;
    return (
        <div className={styles.landing_btn} onClick={click}>
            <p className="m-0" style={{ color: 'white', padding: '15px 40px' }}>
                {placeHolder}
            </p>
        </div>
    );
};
