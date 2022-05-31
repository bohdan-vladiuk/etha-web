import React from 'react';

export interface IProps {
    variant?: string;
}

export const SocialIcons: React.FC<IProps> = (props: IProps) => {
    const iconSize = props.variant === 'dark' ? '18px' : '30px';
    return (
        <div
            className={`d-flex ${props.variant === 'dark' ? '' : 'w-100'}`}
            style={{ justifyContent: `${props.variant === 'dark' ? 'center' : 'space-evenly'}` }}
        >
            <i
                className="fab fa-facebook-square px-2"
                style={{
                    fontSize: iconSize,
                    color: `${props.variant === 'dark' ? '#fff' : '#3B5998'}`,
                    cursor: 'pointer',
                }}
                onClick={() => {
                    window.open(`https://www.facebook.com/EthaOfficialApp`, '_blank');
                }}
            />
            <i
                className="fab fa-instagram px-2"
                style={{
                    fontSize: iconSize,
                    color: `${props.variant === 'dark' ? '#fff' : ''}`,
                    cursor: 'pointer',
                }}
                onClick={() => {
                    window.open(`https://www.instagram.com/ethaofficialapp`, '_blank');
                }}
            />
            <i
                className="fab fa-linkedin px-2"
                style={{
                    fontSize: iconSize,
                    color: `${props.variant === 'dark' ? '#fff' : '#0072B1'}`,
                    cursor: 'pointer',
                }}
                onClick={() => {
                    window.open(`https://www.linkedin.com/company/ethaofficialapp`, '_blank');
                }}
            />
            <i
                className="fab fa-twitter px-2"
                style={{
                    fontSize: iconSize,
                    color: `${props.variant === 'dark' ? '#fff' : '#1DA1F2'}`,
                    cursor: 'pointer',
                }}
                onClick={() => {
                    window.open(`https://twitter.com/getEtha`, '_blank');
                }}
            />
        </div>
    );
};
