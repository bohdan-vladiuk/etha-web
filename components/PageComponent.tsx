// Dependencies
import React, { useEffect} from 'react';

import Image from 'next/image';
import styles from '../styles/Page.module.css';
import { CustomButton } from './Button.component';

interface PageProps {
    image: string;
    header: string;
    details: Array<any>;
    reversed?: boolean;
    checked?: boolean;
    bg?: string;
    button?: { placeHolder: string; click: () => void };
}

export const Page: React.FC<PageProps> = (props: PageProps) => {
    const { image, header, details, reversed, checked, bg, button } = props;
    const fontsize = button ? '5rem' : '3rem';
    const fontweight = button ? 'bold' : '600';
    const lineheight = button ? '5rem' : '3rem';

    return (
        <>
            {!reversed ? (
                <div className={`${styles.page_container} p-0 m-0 flex-lg-row flex-column-reverse`}>
                    <div className={`${styles.page_content_container}`}>
                        <div className={`${styles.page_content}`}>
                            <p
                                style={{
                                    fontSize: `${fontsize}`,
                                    fontWeight: `${fontweight}`,
                                    lineHeight: `${lineheight}`,
                                    wordBreak: 'normal',
                                }}
                            >
                                {header}
                            </p>
                            {details.map((value, index) => {
                                return (
                                    <div className={`${styles.page_one_right_list}`}>
                                        {checked && (
                                            <div className="p-0 m-0" style={{ width: '30px' }}>
                                                <Image
                                                    className="p-0 m-0"
                                                    src="/checked.svg"
                                                    alt=""
                                                    height={30}
                                                    width={30}
                                                />
                                            </div>
                                        )}
                                        <span
                                            className="p-0 m-0"
                                            style={{
                                                width: '90%',
                                                fontSize: `${button ? '1rem' : '1rem'}`,
                                                fontWeight: `${button ? '300' : '300'}`,
                                            }}
                                        >
                                            {value}
                                        </span>
                                    </div>
                                );
                            })}

                            {button && (
                                <div className='p-0 mt-4'>
                                    <CustomButton placeHolder={button.placeHolder} click={button.click} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className={`${styles.page_image_container}`}
                        style={{ backgroundColor: `${bg}`, alignItems: `${bg === undefined && `center`}` }}
                    >
                        <div className={`${styles.page_image} d-flex justify-content-center p-0 m-0`}>
                            <Image className="p-0 m-0" src={`/${image}.svg`} alt="" height={631} width={631} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={`${styles.page_container} p-0 m-0`}>
                    <div
                        className={`${styles.page_image_container}`}
                        style={{ backgroundColor: `${bg}`, alignItems: `${bg === undefined && `center`}` }}
                    >
                        <div
                            className={`${styles.page_image} d-flex align-items-center justify-content-center p-0 m-0`}
                        >
                            <Image className="p-0 m-0" src={`/${image}.svg`} alt="" height={631} width={631} />
                        </div>
                    </div>
                    <div className={`${styles.page_content_container}`}>
                        <div className={`${styles.page_content}`}>
                            <p
                                style={{
                                    fontSize: `${fontsize}`,
                                    fontWeight: `${fontweight}`,
                                    lineHeight: `${lineheight}`,
                                    wordBreak: 'normal',
                                }}
                            >
                                {header}
                            </p>
                            {details.map((value, index) => {
                                return (
                                    <div className={`${styles.page_one_right_list}`}>
                                        {checked && (
                                            <div className="p-0 m-0" style={{ width: '30px' }}>
                                                <Image
                                                    className="p-0 m-0"
                                                    src="/checked.svg"
                                                    alt=""
                                                    height={30}
                                                    width={30}
                                                />
                                            </div>
                                        )}
                                        <span
                                            className="p-0 m-0"
                                            style={{
                                                width: '90%',
                                                fontSize: `${button ? '1.2rem' : '1rem'}`,
                                                fontWeight: `${button ? '200' : '300'}`,
                                            }}
                                        >
                                            {value}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        {button && <CustomButton placeHolder={button.placeHolder} click={button.click} />}
                    </div>
                </div>
            )}
        </>
    );
};
