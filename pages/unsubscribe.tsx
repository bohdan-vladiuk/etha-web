// Dependencies
import React from 'react';
import { Button, FormControl, Row } from 'react-bootstrap';

// Components
import { useEffect } from 'react';
import { useState } from 'react';
import { ContactUs, UnsubscribeNewsletter } from '../middleware';
import { ContactUsForm } from '../models';
import { useDispatch } from 'react-redux';
import { setLoaderVisibility } from '../redux';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Image from 'next/image';

export const Unsubscribe: NextPage = () => {
    const history = useRouter();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    function validateEmail(testMail: string): boolean {
        const re = /\S+@\S+\.\S+/;
        return re.test(testMail);
    }

    return (
        <div
            style={{
                backgroundColor: '#f4f4f4',
            }}
        >
            <Row
                className="d-flex mb-3 m-auto w-100"
                style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ffffff',
                    textJustify: 'inter-word',
                }}
            >
                <Image className="p-0 m-0" src={`/nav_logo.png`} alt="" height={120} width={280} />
            </Row>
            <div
                className="d-flex p-3"
                style={{
                    minHeight: '200px',
                    background: '#4824D6',
                    justifyContent: 'center',
                    color: '#fff',
                    alignItems: 'center',
                    fontSize: '2rem',
                    textAlign: 'center',
                }}
            >
                <div>
                    <b>Unsubscribe from our News Letter</b>
                    <br />
                    <FormControl
                        className="mt-2 mb-1"
                        style={{ borderRadius: '25px' }}
                        placeholder="Email"
                        aria-label="E-Mail"
                        value={email}
                        aria-describedby="basic-addon1"
                        onChange={handleChange}
                    />
                    <Button
                        className=" mt-2 mr-1 p-3"
                        variant="secondary"
                        onClick={() => {
                            if (email.length > 0 && validateEmail(email)) {
                                const contactUsForm: ContactUsForm = {
                                    name: 'No Name',
                                    email: email,
                                    message: 'Unsubscribe',
                                    phone: '',
                                };
                                UnsubscribeNewsletter(contactUsForm, () => {
                                    alert('Submitted your request to unsubscribe from our newsletter');
                                    setEmail('');
                                    history.push('/');
                                });
                            } else {
                                alert('Please Enter Valid Email to Unsubscribe');
                            }
                        }}
                    >
                        <b>Unsubscribe</b>
                    </Button>
                </div>
            </div>
            <Row
                className="d-flex py-4 px-2 mb-3 m-auto w-100"
                style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ffffff',
                    textJustify: 'inter-word',
                }}
            >
                <p
                    className="px-2"
                    style={{ maxWidth: '960px', fontSize: '20px', textJustify: 'inter-word', textAlign: 'justify' }}
                >
                    At Etha, we hope to achieve the ability to separate all the components of politics, until we arrive
                    at the truth. This idea in itself is the definition of the process of distillation and the
                    inspiration behind our name. The most widely known distilled liquid - alcohol, is known as
                    &lsquo;Etha&rsquo; in different languages. It also sets our dream of scaling Etha someday to become
                    a platform that can be used internationally for political discourse.
                </p>
            </Row>
        </div>
    );
};
export default Unsubscribe;
