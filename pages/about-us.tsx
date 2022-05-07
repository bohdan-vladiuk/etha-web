import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { LargeCardDetails, SmallCardDetails, teamCardLarge, teamCardSmall } from '../models/Team';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Head from 'next/head';

export const AboutUs: NextPage = () => {
    const history = useRouter();
    return (
        <>
            <Head>
                <meta name="keywords" content="etha,latest politician statements,political polls" />
            </Head>
            <div
                className="d-flex w-100 p-4"
                style={{
                    minHeight: '200px',
                    justifyContent: 'center',
                    color: '#000',
                    alignItems: 'center',
                    fontSize: '40px',
                    justifyItems: 'center',
                    textAlign: 'center',
                }}
            >
                <p>
                    <b>The Etha Story</b>
                </p>
            </div>
            <Row
                className="d-flex py-4 px-2 mb-3 m-auto w-100"
                style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    textJustify: 'inter-word',
                }}
            >
                <p style={{ maxWidth: '960px', fontSize: '20px', textJustify: 'inter-word', textAlign: 'justify' }}>
                    What is Etha? Etha stands for ethics as well as ethanol, which is the scientific term for
                    &lsquo;alcohol&rsquo; and is the result of distillation. Distillation, defined as &ldquo;the action
                    of purifying or the extraction of essential meaning,&rdquo; has been the inspiration of our mission.
                    Our dream is for Etha to become the platform for global political discourse. At Etha, we seek to
                    separate all the components of politics until we arrive at the truth by removing the pollutants that
                    muddy the waters of mainstream media.
                </p>
            </Row>
            <Row className="d-flex py-4 mb-2 m-auto w-100" style={{ justifyContent: 'center' }}>
                <Col
                    lg={4}
                    className="d-flex p-0"
                    style={{ alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}
                >
                    <Image style={{ maxWidth: '80%' }} src="/about_us1.png" fluid alt="" />
                </Col>
                <Col
                    className="d-flex px-auto "
                    style={{ alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}
                    lg={5}
                >
                    <div style={{ width: '100% !important', justifyContent: 'center', textAlign: 'center' }}>
                        <h2 style={{ width: '100%', justifyContent: 'start', fontSize: '45px' }}>Our Foundation</h2>
                        <p
                            className="mt-3"
                            style={{
                                fontSize: '20px',
                                textJustify: 'inter-word',
                                textAlign: 'justify',
                            }}
                        >
                            In response to recent presidential elections and the widespread media control during the
                            COVID-19 Pandemic, Nicole Ogloza and Aastik Saini founded Etha in January 2021. Their goal
                            was to create a platform where users could engage in intelligent political discourse based
                            on objective, unbiased facts.
                        </p>
                    </div>
                </Col>
            </Row>
            <Row className="d-flex py-4 mb-2 m-auto w-100" style={{ justifyContent: 'center' }}>
                <Col
                    lg={5}
                    className="d-flex px-auto "
                    style={{ alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}
                >
                    <div style={{ width: '100% !important', justifyContent: 'center', textAlign: 'center' }}>
                        <h2 style={{ width: '100%', justifyContent: 'start', fontSize: '45px' }}>Our Journey</h2>
                        <p
                            className="mt-3"
                            style={{
                                fontSize: '20px',
                                textJustify: 'inter-word',
                                textAlign: 'justify',
                            }}
                        >
                            We have come a long way in a very short time, and our journey has been nothing short of a
                            rollercoaster ride. From just three founding members in early 2021, we have added over
                            thirty members to our staff equally dedicated to social-political change. With the guidance
                            of experienced advisors and the support of our invaluable team, we have set out to conquer
                            the world. This is no small task, and we have a long way to go, but we invite you to join us
                            on our journey towards a better way to think about politics.
                        </p>
                    </div>
                </Col>
                <Col
                    className="d-flex px-auto "
                    style={{ alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}
                    lg={4}
                >
                    <Image style={{ maxWidth: '80%' }} src="/about_us2.png" fluid alt="" />
                </Col>
            </Row>
            <Row className="d-flex pt-4" style={{ alignItems: 'center', justifyContent: 'center' }}>
                <h2 style={{ fontSize: '50px' }}> Meet Us</h2>
            </Row>
            <Container
                className="d-flex p-5 m-auto"
                style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}
            >
                {teamCardLarge.map((details: LargeCardDetails, index: number) => {
                    return (
                        <>
                            <Col className="mb-4 py-2" key={index} xs={12} md={6}>
                                <div className="d-flex" style={{ alignItems: 'center' }}>
                                    <Image
                                        style={{ width: '40%' }}
                                        className="py-3 pr-4"
                                        src={details.image}
                                        fluid
                                        alt=""
                                    />
                                    <div>
                                        <h2 className="my-1" style={{ fontSize: '25px' }}>
                                            {details.name}
                                        </h2>
                                        <p className="my-1" style={{ fontSize: '15px' }}>
                                            {details.title}
                                        </p>
                                        <hr className="my-1" />
                                        <p
                                            className="mt-3"
                                            style={{
                                                fontSize: '15px',
                                                textJustify: 'auto',
                                                textAlign: 'justify',
                                            }}
                                        >
                                            {' '}
                                            {details.shortInfo}
                                        </p>
                                        <hr className="my-1" />
                                        <p className="my-1" style={{ fontSize: '11px' }}>
                                            {details.funfact}
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        </>
                    );
                })}
            </Container>
            <Container className="d-flex pt-3 " style={{ alignItems: 'center', justifyContent: 'center' }}>
                <h2> Our Backbone</h2>
            </Container>
            <Container
                className="d-flex m-auto   "
                style={{ width: '80%', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}
            >
                {teamCardSmall.map((details: SmallCardDetails, index: number) => {
                    return (
                        <div className="text-center p-3" key={index}>
                            <Image style={{ width: '100px' }} className="py-3 px-2" src={details.image} fluid alt="" />
                            <h5 className="my-1">{details.name}</h5>
                            <p className="my-1" style={{ fontSize: '10px' }}>
                                {details.title}
                            </p>
                        </div>
                    );
                })}
            </Container>
        </>
    );
};
export default AboutUs;
