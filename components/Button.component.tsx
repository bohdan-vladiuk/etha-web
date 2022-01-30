// Dependencies
import React from 'react';
import { Modal } from 'react-bootstrap';
import Image from 'next/image';
import styles from '../styles/Button.module.css';

interface ButtonProps {
    placeHolder: string;
    click?: () => void;
    width?: string;
}

export const CustomButton: React.FC<ButtonProps> = (props: ButtonProps) => {
    const { placeHolder, click, width } = props;
    return (
        <div className={styles.landing_btn} onClick={click} style={{width: `${width && width }`}}>
            <p className="m-0" style={{ color: 'white' }}>
                {placeHolder}
            </p>
        </div>
    );
};
