// Dependencies
import React, { useEffect, useState } from 'react';
// Components
import { VoteCount } from '../models';
import Image from 'next/image';

interface CompareBarProps {
    votingDetails: VoteCount;
}
export const CompareBar: React.FC<CompareBarProps> = (props: CompareBarProps) => {
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
                        className="d-flex w-100 text-center m-0 p-0"
                        style={{
                            justifyContent: 'flex-end',
                        }}
                    >
                        <p
                            className="m-0"
                            style={{
                                zIndex: 1,
                                color: 'green',
                                fontSize: '18px',
                            }}
                        >
                            <span
                                style={{
                                    filter: 'invert(21%) sepia(78%) saturate(4550%) hue-rotate(116deg) brightness(92%) contrast(101%)',
                                }}
                            >
                                <Image src="/icons/agree.png" alt="" height={15} width={15} />
                            </span>
                            {' ' + agreePercent + '%'}
                        </p>
                        &nbsp;|&nbsp;
                        <p
                            className="m-0"
                            style={{
                                zIndex: 1,
                                color: 'red',
                                fontSize: '18px',
                            }}
                        >
                            <span
                                style={{
                                    filter: 'invert(24%) sepia(94%) saturate(6418%) hue-rotate(356deg) brightness(101%) contrast(119%)',
                                }}
                            >
                                <Image src="/icons/disagree.png" alt="" height={15} width={15} />
                            </span>
                            {' ' + disagreePercent + '%'}
                        </p>
                    </div>
                    <div className="d-flex w-100 text-center m-0 p-0" style={{ justifyContent: 'center' }}>
                        <div
                            style={{
                                width: agreePercent + '%',
                                height: '5px',
                                background: 'green',
                                position: 'relative',
                                left: 0,
                            }}
                        ></div>
                        <div
                            style={{
                                width: disagreePercent + '%',
                                height: '5px',
                                background: 'red',
                                position: 'relative',
                                left: 0,
                            }}
                        ></div>
                    </div>
                </>
            )}
        </div>
    );
};
