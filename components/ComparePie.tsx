import React from 'react';
import { VoteCount } from '../models';
import { useEffect } from 'react';
import { useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
interface ComparePieProps {
    votingDetails: VoteCount;
}
export const ComparePie: React.FC<ComparePieProps> = (props: ComparePieProps) => {
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
        <div
            className="d-flex w-100 text-center m-0 px-1"
            style={{ justifyContent: 'center', height: '150px', width: '170px', flexDirection: 'column' }}
        >
            {props.votingDetails.agree + props.votingDetails.disagree > 0 && (
                <>
                    <CircularProgressbar
                        value={agreePercent}
                        maxValue={100}
                        strokeWidth={15}
                        counterClockwise
                        styles={buildStyles({
                            textSize: '14px',
                            strokeLinecap: 'round',
                            textColor: 'black',
                            pathColor: `#66D88D`,
                            trailColor: `#F84545`,
                            pathTransitionDuration: 2,
                        })}
                    />
                    <p style={agreePercent > 50 ? { color: '#389C38' } : { color: '#F84545' }}> {`${agreePercent}%`}</p>
                </>
            )}
        </div>
    );
};
