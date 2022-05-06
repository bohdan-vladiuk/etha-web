import React from 'react';
import { Button, Col, Modal, Image } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
    TelegramShareButton,
    TelegramIcon,
    EmailShareButton,
    EmailIcon,
} from 'react-share';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useAppSelector } from '../redux/store';

interface ShareModalProps {
    onHide: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = (props: ShareModalProps) => {
    const { onHide } = props;
    const state = useAppSelector((reduxState) => ({
        userId: reduxState.userReducer.user_id,
        isSharing: reduxState.screenReducer.isSharing,
        postId: reduxState.screenReducer.sharePostId,
    }));

    const postLink = `https://etha.one/post/${state.postId}`;
    const textToShare = `Checkout this post on Etha :`;
    const shareData = {
        title: 'Etha - Future of Politics',
        text: textToShare,
        url: postLink,
    };
    return (
        <Modal contentClassName="share-modal" show={state.isSharing} onHide={onHide}>
            <Modal.Body
                className="m-0 p-0"
                style={{
                    width: '100%',
                    minWidth: '210px',
                    maxWidth: '500px',
                    position: 'fixed',
                    bottom: 0,
                    justifyContent: 'center',
                    padding: 0,
                    backgroundColor: '#fefefe',
                    borderRadius: '25px 25px 0px 0px',
                }}
            >
                <Col
                    className="m-0 p-0"
                    lg={12}
                    style={{
                        height: '100%',
                        padding: '10px',
                        textAlign: 'center',
                        backgroundColor: 'white',
                        borderRadius: '25px',
                    }}
                >
                    <h4 className="ml-2 mt-2">
                        <b>Share this Post Via</b>
                    </h4>
                    <hr />

                    <div className="mt-2 mb-2 d-flex w-100" style={{ justifyContent: 'space-evenly', color: '9b12d8' }}>
                        <div>
                            <CopyToClipboard text={postLink}>
                                <div>
                                    <Button
                                        variant="lighter text-center m-1 p-0"
                                        onClick={() => {
                                            toast('The Link has been copied');
                                        }}
                                        style={{ borderRadius: '50px' }}
                                    >
                                        <div
                                            style={{
                                                filter: 'invert(56%) sepia(0%) saturate(1289%) hue-rotate(176deg) brightness(89%) contrast(86%)',
                                            }}
                                        >
                                            <Image
                                                quality="100"
                                                className=""
                                                src="/icons/88026.png"
                                                alt=""
                                                height={50}
                                                width={50}
                                            />
                                        </div>
                                    </Button>
                                </div>
                            </CopyToClipboard>
                        </div>
                        <FacebookShareButton className="m-1" url={postLink} quote={textToShare} onClick={() => {}}>
                            <FacebookIcon size={50} round />
                        </FacebookShareButton>
                        <TwitterShareButton className="m-1" url={postLink} title={textToShare} onClick={() => {}}>
                            <TwitterIcon size={50} round />
                        </TwitterShareButton>
                        <LinkedinShareButton className="m-1" url={postLink} title={textToShare} onClick={() => {}}>
                            <LinkedinIcon size={50} round />
                        </LinkedinShareButton>
                    </div>
                    <hr />
                    <div className="mt-2 mb-2 d-flex w-100" style={{ justifyContent: 'space-evenly', color: '9b12d8' }}>
                        <WhatsappShareButton
                            className="m-1"
                            url={postLink}
                            title={textToShare}
                            separator=":: "
                            onClick={() => {}}
                        >
                            <WhatsappIcon size={50} round />
                        </WhatsappShareButton>
                        <EmailShareButton
                            subject={'Post on Etha'}
                            body={textToShare}
                            url={postLink}
                            separator={' '}
                            onClick={() => {}}
                        >
                            <EmailIcon size={50} round />
                        </EmailShareButton>
                        <TelegramShareButton url={postLink} title={textToShare} className="m-1" onClick={() => {}}>
                            <TelegramIcon size={50} round />
                        </TelegramShareButton>
                        {typeof navigator !== 'undefined' && navigator.share ? (
                            <Button
                                variant=" p-0 mb-2"
                                onClick={async () => {
                                    await navigator.share(shareData);
                                }}
                            >
                                {/* <MoreHorizOutlinedIcon /> */}

                                <Image
                                    quality="100"
                                    className=""
                                    src="/icons/button.png"
                                    alt=""
                                    height={50}
                                    width={50}
                                />
                            </Button>
                        ) : (
                            <></>
                        )}
                    </div>
                    <hr />
                    <Button
                        className="mt-3 mb-3"
                        style={{ width: '60%' }}
                        variant="secondary"
                        onClick={() => {
                            onHide();
                        }}
                        type="button"
                    >
                        Close
                    </Button>
                </Col>
            </Modal.Body>
        </Modal>
    );
};
