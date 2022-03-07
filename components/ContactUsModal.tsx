// Dependencies
import React, { useState, useEffect } from 'react';

import { AddToWaitlist, ContactUs } from '../middleware';
import { Modal, Dropdown, Form } from 'react-bootstrap';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../redux/store';

import style from '../styles/ContactModal.module.css';
import { ContactUsForm } from '../models';

interface ConatctUsModalProps {
    onHide: () => void;
    show: boolean;
}

export const ContactUsModal: React.FC<ConatctUsModalProps> = (props: ConatctUsModalProps) => {
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');

    const [countryCode, setCountryCode] = useState('+1');

    const [charLength, setCharLength] = useState(0);

    const { onHide } = props;
    const dispatch = useAppDispatch();

    const [focusedEmail, setFocusedEmail] = useState<boolean>(false);
    const [focusedMobile, setFocusedMobile] = useState<boolean>(false);

    const [toggleDropdown, setToggle] = useState<boolean>(false);

    const [submit, setSubmit] = useState<boolean>(false);
    const state = useAppSelector((reduxState) => ({
        isContactForm: reduxState.screenReducer.isContactForm,
    }));
    const [countryData, setCountryData] = useState<any[]>([]);
    const [countryFlagData, setCountryFlagData] = useState<any[]>([]);
    const [countryFlag, setCountryFlag] = useState('\ud83c\uddfa\ud83c\uddf8');

    const [viewingMobile, setViewingMobile] = useState<boolean>(false);
    const [viewingEmail, setViewingEmail] = useState<boolean>(false);

    const cn = focusedEmail ? style.input_label_animate : style.input_label;
    const pn = focusedMobile ? style.input_label_animate : style.input_label;

    useEffect(() => {
        focusing();
        formatMobile(mobile);
        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });
    });
    useEffect(() => {
        setEmail('');
        setMobile('');
        setFocusedEmail(false);
        setFocusedMobile(false);

        fetch('https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/by-code.json')
            .then((response) => response.json())
            .then((data) => {
                setCountryFlagData(data);
            });

        fetch(
            'https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json',
        )
            .then((response) => response.json())
            .then((data) => {
                var list: any[] = [];
                for (var idx in data) {
                    list.push([data[idx].code, data[idx].dial_code]);
                }
                setCountryData(list);
            });
    }, []);

    function formatMobile(p: string) {
        if (mobile.length >= charLength) {
            if (p.length === 3) setMobile(p.replace(/^(\d{3})$/, '$1-'));
            if (p.length === 7) setMobile(p.replace(/^(\d{3})\-(\d{3})$/, '$1-$2-'));
            if (p.length === 12) setMobile(p.replace(/^(\d{3})\-(\d{3})\-(\d{4})$/, '$1-$2-$3'));
        }
    }

    function focusing() {
        email.length > 0 ? setViewingEmail(true) : setViewingEmail(false);
        mobile.length > 0 ? setViewingMobile(true) : setViewingMobile(false);
    }

    function validateEmail(testMail: string): boolean {
        const re = /\S+@\S+\.\S+/;
        return re.test(testMail);
    }

    return (
        <>
            <Modal
                className="d-flex m-0 p-0"
                show={props.show}
                onHide={onHide}
                backdrop="static"
                centered
                dialogClassName="custom-modal"
                bsClass="my-modal"
            >
                <Modal.Body bsPrefix={style.contact_modal_container}>
                    <div
                        className={style.close_btn}
                        style={{
                            zIndex: '10',
                            cursor: 'pointer',
                            position: 'absolute',
                            right: '0px',
                            top: '25px',
                            margin: '20px',
                        }}
                        onClick={() => {
                            onHide();
                            setEmail('');
                            setMobile('');
                            setCountryCode('+1');
                            setCountryFlag('\uD83C\uDDFA\uD83C\uDDF2');
                            setFocusedEmail(false);
                            setFocusedMobile(false);
                            focusing();
                        }}
                    >
                        <Image src="/close.svg" height={40} width={40} alt="Close" />
                    </div>
                    <div className={style.contact_container}>
                        <div
                            className={`${style.contact_details} d-flex justify-content-md-center justify-content-start`}
                        >
                            <div style={{ width: '75%', margin: 'auto 0' }}>
                                <p style={{ fontSize: '45px', fontWeight: '700', lineHeight: '5vh' }}>Join Waitlist</p>
                                <p style={{ fontSize: '16px', fontWeight: '200' }}>
                                    Enter your email to sign up for early-acess to the Etha app!
                                </p>

                                <Form className="d-flex flex-column w-100 m-0">
                                    <Form.Group
                                        className={`${style.input_container}`}
                                        onClick={() => {
                                            setFocusedEmail(true);
                                            setFocusedMobile(false);
                                        }}
                                        controlId="formBasicEmail"
                                    >
                                        <Form.Label
                                            className={`${viewingEmail ? style.input_label_animate : cn} p-0 m-0`}
                                        >
                                            Email address
                                        </Form.Label>
                                        {focusedEmail && (
                                            <Form.Control
                                                tabIndex={0}
                                                className={`p-0 m-0`}
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    outline: 'none',
                                                    fontSize: '16px',
                                                    fontWeight: 'bold',
                                                    color: 'black',
                                                }}
                                                type="email"
                                                value={email}
                                                placeholder="example@etha.one"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        )}
                                        {viewingEmail && !focusedEmail && (
                                            <Form.Control
                                                className={`p-0 m-0`}
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    outline: 'none',
                                                    fontSize: '16px',
                                                    fontWeight: 'bold',
                                                    color: 'black',
                                                }}
                                                type="email"
                                                value={email}
                                                placeholder="example@etha.one"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        )}
                                    </Form.Group>
                                    <Form.Group className="d-flex mb-2 mt-3">
                                        <Dropdown
                                            className={`${style.dropdown_container} mr-2`}
                                            style={{ width: '30%' }}
                                            onClick={() => {
                                                setToggle(!toggleDropdown);
                                            }}
                                        >
                                            <div className={`${style.dropdown_active}`}>
                                                <p className="p-0 m-0" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                                                    {countryCode}
                                                </p>
                                                {countryFlag}
                                                <Image
                                                    className="p-0 m-0"
                                                    src="/dropdownArrow.svg"
                                                    height={10}
                                                    width={10}
                                                    alt=""
                                                />
                                            </div>
                                        </Dropdown>
                                        <Form.Group
                                            className={`${style.input_container}`}
                                            controlId="formBasicMobile"
                                            onClick={() => {
                                                setFocusedEmail(false);
                                                setFocusedMobile(true);
                                            }}
                                        >
                                            <Form.Label
                                                className={`${viewingMobile ? style.input_label_animate : pn} p-0 m-0`}
                                            >
                                                Mobile number
                                            </Form.Label>
                                            {focusedMobile && (
                                                <Form.Control
                                                    tabIndex={0}
                                                    className={`p-0 m-0`}
                                                    style={{
                                                        backgroundColor: 'transparent',
                                                        border: 'none',
                                                        outline: 'none',
                                                        fontSize: '16px',
                                                        fontWeight: 'bold',
                                                        color: 'black',
                                                    }}
                                                    type="tel"
                                                    placeholder="555-555-5555"
                                                    value={mobile}
                                                    onChange={(e) => {
                                                        if (
                                                            mobile.length < 12 ||
                                                            e.target.value.length < mobile.length
                                                        ) {
                                                            setMobile(e.target.value);
                                                            setCharLength(mobile.length);
                                                        }
                                                    }}
                                                />
                                            )}
                                            {viewingMobile && !focusedMobile && (
                                                <Form.Control
                                                    tabIndex={0}
                                                    className={`p-0 m-0`}
                                                    style={{
                                                        backgroundColor: 'transparent',
                                                        border: 'none',
                                                        outline: 'none',
                                                        fontSize: '16px',
                                                        fontWeight: 'bold',
                                                        color: 'black',
                                                    }}
                                                    type="tel"
                                                    value={mobile}
                                                    placeholder="555-555-5555"
                                                    onChange={(e) => {
                                                        if (
                                                            mobile.length < 12 ||
                                                            e.target.value.length < mobile.length
                                                        ) {
                                                            setMobile(e.target.value);
                                                            setCharLength(mobile.length);
                                                        }
                                                    }}
                                                />
                                            )}
                                        </Form.Group>
                                    </Form.Group>
                                    <Form.Group>
                                        {toggleDropdown && (
                                            <div className={`${style.dropdown_menu} mt-2`}>
                                                {countryData.sort().map((val, idx) => {
                                                    return (
                                                        <div
                                                            key={val}
                                                            className="d-flex justify-content-between align-items-center w-100 py-2"
                                                            style={{
                                                                borderBottom: '1px solid #0000000f',
                                                                width: '80%',
                                                            }}
                                                            onClick={() => {
                                                                setCountryCode(val[1]);
                                                                setCountryFlag(
                                                                    val[0] in countryFlagData
                                                                        ? countryFlagData[val[0]].emoji
                                                                        : '\uD83C\uDDE7\uD83C\uDDF6',
                                                                );
                                                                setToggle(false);
                                                            }}
                                                        >
                                                            <p
                                                                className="d-flex  m-0 "
                                                                style={{ width: '33%', fontWeight: 'bold' }}
                                                            >
                                                                {val[0]}
                                                            </p>
                                                            <div
                                                                className="d-flex justify-content-center m-0 pl-0"
                                                                style={{ width: '33%', fontWeight: 'bold' }}
                                                            >
                                                                {val[0] in countryFlagData
                                                                    ? countryFlagData[val[0]].emoji
                                                                    : '\uD83C\uDDE7\uD83C\uDDF6'}
                                                            </div>
                                                            <p
                                                                className="d-flex justify-content-end m-0 "
                                                                style={{ width: '33%', fontWeight: 'bold' }}
                                                            >
                                                                {val[1]}
                                                            </p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </Form.Group>

                                    <div
                                        className={style.contact_btn}
                                        onClick={() => {
                                            if (validateEmail(email) && mobile.length === 12) {
                                                const contactUsForm: ContactUsForm = {
                                                    name: 'waitlist',
                                                    phone: `${countryCode}-${mobile}`,
                                                    email: email,
                                                    message: 'Sign Up for waitlist',
                                                };
                                                AddToWaitlist(contactUsForm, () => {
                                                    setEmail('');
                                                    setMobile('');
                                                    setCountryCode('+1');
                                                    setCountryFlag('\uD83C\uDDFA\uD83C\uDDF2');
                                                });
                                                onHide();
                                                setSubmit(true);
                                            } else {
                                                alert('Please fill in the right details.');
                                            }
                                        }}
                                    >
                                        <p className="m-0" style={{ color: 'white', padding: '15px 40px' }}>
                                            Join Waitlist
                                        </p>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <div className={`${style.contact_image}`} style={{ backgroundColor: '#f9f9f9' }}>
                            <Image src="/landing2.svg" alt="" height={600} width={600} />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                className="d-flex m-0 p-0"
                show={submit}
                onHide={() => setSubmit(false)}
                backdrop="static"
                centered
                dialogClassName="custom-modal"
                bsClass="my-modal"
            >
                <Modal.Body bsPrefix={style.contact_modal_container}>
                    <div
                        className={style.close_btn}
                        style={{ cursor: 'pointer', position: 'absolute', right: '0px', top: '25px', margin: '20px' }}
                        onClick={() => {
                            setSubmit(false);
                        }}
                    >
                        <Image src="/close.svg" height={40} width={40} alt="Close" />
                    </div>
                    <div
                        className={`d-flex flex-column align-items-center justify-content-center`}
                        style={{ height: '100%' }}
                    >
                        <div className={style.contact_image} style={{ height: '30%' }}>
                            <Image src="/landing3a.svg" alt="" height={366} width={907.62} />
                        </div>
                        <div className="d-flex flex-column align-items-center" style={{ width: '75%' }}>
                            <p style={{ fontSize: '45px', fontWeight: '700', lineHeight: '5vh' }}>
                                Let the information revolution begin!
                            </p>
                            <p style={{ fontSize: '16px', fontWeight: '200' }}>
                                Stay tuned for an exclusive code to acceess to Etha.
                            </p>
                        </div>
                        <div className={style.contact_image} style={{ height: '30%' }}>
                            <Image src="/landing3b.svg" alt="" height={358.88} width={859.92} />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};
