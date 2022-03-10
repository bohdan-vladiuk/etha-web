// Dependencies
import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import _ from 'lodash';
import { VerifyEmail } from '../middleware/User';

export const EmailVerification: NextPage = () => {
    const history = useRouter();
    const id = history.query.id?.toString();
    const secret = history.query.secret?.toString() || '';
    const accept = history.query.accept?.toString();

    useEffect(() => {
        if (!_.isEmpty(id) && !_.isEmpty(secret) && !_.isEmpty(accept))
            VerifyEmail(
                Number(id),
                secret,
                Boolean(accept),
                (response) => {
                    if (response) {
                        if (Boolean(accept) === true) {
                            alert('Verified your email address');
                            history.push('/');
                        } else {
                            alert('Declined the request');
                            history.push('/');
                        }
                    } else {
                        alert('There was an error processing your request, Please request to verify again');
                        history.push('/');
                    }
                },
                () => {
                    alert('There was an error processing your request, Please request to verify again');
                    history.push('/');
                },
            );
    }, [id, secret, accept]);
    return (
        <div>
            <div
                className="d-flex w-100 mt-5"
                style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
            >
                <Spinner className="my-2" animation="border" role="status" variant="secondary" />
                <h1>Verifying your Email</h1>
            </div>
        </div>
    );
};
export default EmailVerification;
