// Dependencies
import React from 'react';
import { Modal } from 'react-bootstrap';
import Image from 'next/image';
import styles from '../styles/LoadModal.module.css';

interface LoadingModalProps {
    show: boolean;
    onHide: () => void;
}

export const LoadingModal: React.FC<LoadingModalProps> = (props: LoadingModalProps) => {
    const { show, onHide } = props;
    return (
        <Modal contentClassName={styles.load_modal} show={show} onHide={onHide} centered>
            <Image className={styles.load_image} alt="" height={80} width={80} src="/loading.gif" />
        </Modal>
    );
};
