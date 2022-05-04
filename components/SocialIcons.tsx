import React from 'react';

export const SocialIcons: React.FC = () => {
    return (
        <div className="d-flex w-100" style={{ justifyContent: 'space-evenly' }}>
            <i
                className="fab fa-facebook-square px-2"
                style={{ fontSize: '30px', color: '#3B5998', cursor: 'pointer' }}
                onClick={() => {
                    window.open(`https://www.facebook.com/EthaOfficialApp`, '_blank');
                }}
            />
            <i
                className="fab fa-instagram px-2"
                style={{
                    fontSize: '30px',
                    cursor: 'pointer',
                }}
                onClick={() => {
                    window.open(`https://www.instagram.com/ethaofficialapp`, '_blank');
                }}
            />
            <i
                className="fab fa-linkedin px-2"
                style={{ fontSize: '30px', color: '#0072B1', cursor: 'pointer' }}
                onClick={() => {
                    window.open(`https://www.linkedin.com/company/ethaofficialapp`, '_blank');
                }}
            />
            <i
                className="fab fa-twitter px-2"
                style={{ fontSize: '30px', color: '#1DA1F2', cursor: 'pointer' }}
                onClick={() => {
                    window.open(`https://twitter.com/getEtha`, '_blank');
                }}
            />
        </div>
    );
};
