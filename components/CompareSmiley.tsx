// Dependencies
import React from 'react';
// Components
import { VoteCount } from '../models';
// CSS
import { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';
interface CompareBarProps {
    votingDetails: VoteCount;
}
export const CompareSmiley: React.FC<CompareBarProps> = (props: CompareBarProps) => {
    const [agreePercent, setAgreePercent] = useState(0);
    const [disagreePercent, setDisagreePercent] = useState(0);
    useEffect(() => {
        const truePercent = (
            (props.votingDetails.agree / (props.votingDetails.agree + props.votingDetails.disagree)) *
            100
        ).toFixed(0);
        setAgreePercent(Number(truePercent));
        setDisagreePercent(100 - Number(truePercent));
    }, [props.votingDetails]);
    return (
        <div className=" w-100 text-center m-0 px-1" style={{ justifyContent: 'center' }}>
            {props.votingDetails.agree + props.votingDetails.disagree > 0 && (
                <>
                    <div
                        className="d-flex w-80 text-center m-0 p-0"
                        style={{
                            justifyContent: 'center',
                            alignItems: 'end',
                        }}
                    >
                        {agreePercent > 0 && (
                            <div
                                className="d-flex m-2"
                                style={{
                                    flexDirection: 'column',
                                    filter: 'invert(42%) sepia(82%) saturate(382%) hue-rotate(71deg) brightness(100%) contrast(95%)',
                                }}
                            >
                                <Image
                                    className=""
                                    src="/icons/smiley_up.png"
                                    height={agreePercent}
                                    width={agreePercent}
                                />
                                <p style={{ color: '#389C38' }}> {`${agreePercent}%`}</p>
                            </div>
                        )}
                        {disagreePercent > 0 && (
                            <div
                                className="d-flex m-2"
                                style={{
                                    flexDirection: 'column',
                                    filter: 'invert(49%) sepia(52%) saturate(5124%) hue-rotate(335deg) brightness(100%) contrast(95%)',
                                }}
                            >
                                <Image
                                    src="/icons/smiley_down.png"
                                    alt=""
                                    height={disagreePercent}
                                    width={disagreePercent}
                                />
                                <p style={{ color: '#F84545' }}>{`${disagreePercent}%`}</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
