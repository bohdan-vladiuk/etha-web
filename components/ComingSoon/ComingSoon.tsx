import React from 'react';
import CountDown from './Timer';

export const ComingSoon: React.FC = () => {
    return (
        <div
            className="py-5"
            style={{
                justifyContent: 'center',
                textAlign: 'center',
                backgroundColor: '#B2B2F1',
                color: 'white',
            }}
        >
            <h1 style={{ color: 'white' }}>Will be covering Russia-Ukraine Soon</h1>
            <CountDown />
        </div>
    );
};
