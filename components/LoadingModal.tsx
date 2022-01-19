// Dependencies
import React from 'react';
import { Modal } from 'react-bootstrap';
import Image from 'next/image';

interface LoadingModalProps {
    show: boolean;
    onHide: () => void;
}

export const LoadingModal: React.FC<LoadingModalProps> = (props: LoadingModalProps) => {
    const { show, onHide } = props;
    return (
        <Modal
            contentClassName="load-modal"
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Image className="load-image" alt="" height={80} width={80} src="/test_load.gif" />
        </Modal>
    );
};
