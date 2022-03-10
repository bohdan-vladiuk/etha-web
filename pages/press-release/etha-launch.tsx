// Dependencies
import React from 'react';
import { Col, Row, Container, Image } from 'react-bootstrap';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Head from 'next/head';

export const PressArticle: NextPage = () => {
    const history = useRouter();

    return (
        <div>
            <Head>
                <title>Etha launches world’s first non-partisan polling tool for political statements</title>
                <meta
                    property="og:title"
                    content="Etha launches world’s first non-partisan polling tool for political statements"
                    key="ogTitle"
                />
            </Head>
            <div
                className="d-flex p-4"
                style={{
                    minHeight: '200px',
                    justifyContent: 'center',
                    color: '#000',
                    alignItems: 'center',
                    fontSize: '34px',
                    justifyItems: 'center',
                }}
            >
                <div style={{ maxWidth: '900px', textJustify: 'inter-word' }}>
                    <b>{"Launch of Etha app, world's first non-partisan polling tool for political candidates."}</b>
                </div>
            </div>
            <Container
                className="d-flex pt-4 mb-2 "
                style={{ textAlign: 'justify', flexDirection: 'column', maxWidth: '900px' }}
            >
                <p>
                    NEW YORK, NEW YORK -- 10 August, 2021 -- Etha, Inc., a Technology and Media startup, launches Etha,
                    the world’s first non-partisan polling tool for political statements. For the first time, voters
                    will have a one-stop shop to check all statements made on social media by political candidates.
                </p>
                <p>
                    Nicole Ogloza and Aastik Saini, founders of Etha, wanted to avoid misinformation about politicians
                    and their views. So they launched Etha, a tool that uses crowd-sourced objective truth, plus machine
                    learning, to provide people with a safe guide for political polls, without misinformation. Etha
                    wishes to stabilize and depoliticize mass media.
                </p>{' '}
                <p>
                    “In the United States of America, we are in dire need of political discourse without the taint of
                    misinformation -- and Etha makes that a reality,” says Co-founder Nicole Ogloza. “The world needs a
                    web platform like Etha.one where people can engage on political matters in an intelligent way,” she
                    says.
                </p>{' '}
                <p>
                    Etha.one lets people
                    <ul>
                        <li> Research political statements by politicians </li>
                        <li>Vote “thumbs up” or “thumbs down” on political statements </li>
                        <li> Enjoy fun, intelligent discourse on an app that has no censorship</li>
                    </ul>
                </p>
                <p>
                    Co-founder Aastik Saini confides, “what people will like is that with Etha, you can view a
                    politician&#39;s past track record, and how public opinion has fluctuated over a period of time.”
                    Saini adds, “Etha aggregates public opinion regarding politicians and plots that opinion over time
                    to give an unbiased view of public opinion of politicians. Etha enables people to monitor each step
                    taken by their beloved politicians in a way that is secure and private.”
                </p>
                <p>
                    People can use Etha to gauge public sentiment about political candidates in an unbiased forum.
                    According to Ogloza, “When people can exchange political views without being censored, without being
                    fed misinformation, everyone benefits.”
                </p>{' '}
                <p>
                    Without effort, people can use Etha to find crowd-sourced objective truth about politics. Etha is
                    launched with listings of top politicians, and will build its library until all members of Congress
                    are listed. Etha is available exclusively at&nbsp;
                    <a href="https://etha.one/" target="_blank" rel="noreferrer">
                        https://www.etha.one/
                    </a>
                </p>{' '}
                <p>
                    <p>
                        <b>About Etha, Inc.</b> <br />
                        Etha, Inc., is a Technology and Media startup incorporated in Delaware, with headquarters in New
                        York, and employees around the world. Etha leverages ideas from the best and the brightest
                        people who are concerned about the crossroads of machine learning, media and misinformation.
                    </p>
                    <p>
                        <b>
                            Media contact <br /> For press inquiries,
                        </b>
                        &nbsp;contact Nicole Ogloza at <a href="mailto:nicole@etha.one"> nicole@etha.one</a>
                    </p>
                </p>
            </Container>
        </div>
    );
};
export default PressArticle;
