import React from 'react';
import { Col, Row, Container, Image } from 'react-bootstrap';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Head from 'next/head';

export const PrivacyPolicy: NextPage = () => {
    const history = useRouter();

    return (
        <div>
            <Head>
                <meta name="keywords" content="politics,latest politician statements,political polls" />
            </Head>
            <div
                className="d-flex p-4"
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
                <div style={{ maxWidth: '900px' }}>
                    <b>{'Privacy Policy'}</b>
                </div>
            </div>
            <Container
                className="d-flex pt-4 mb-2 "
                style={{ textAlign: 'justify', flexDirection: 'column', maxWidth: '900px' }}
            >
                <p>Elkool Privacy Policy</p>

                <p>
                    This Privacy Policy describes how your personal information is collected, used, and shared when you
                    visit or make a purchase from (the &ldquo;Site&rdquo;).
                </p>

                <p>PERSONAL INFORMATION WE COLLECT</p>

                <p>
                    When you visit the Site, we automatically collect certain information about your device, including
                    information about your web browser, IP address, time zone, and some of the cookies that are
                    installed on your device. Additionally, as you browse the Site, we collect information about the
                    individual web pages or products that you view, what websites or search terms referred you to the
                    Site, and information about how you interact with the Site. We refer to this automatically-collected
                    information as &ldquo;Device Information.&rdquo;
                </p>

                <p>We collect Device Information using the following technologies:</p>

                <p>
                    {' '}
                    - &ldquo;Log files&rdquo; track actions occurring on the Site, and collect data including your IP
                    address, browser type, Internet service provider, referring/exit pages, and date/time stamps. -
                    &ldquo;Web beacons,&rdquo; &ldquo;tags,&rdquo; and &ldquo;pixels&rdquo; are electronic files used to
                    record information about how you browse the Site.
                </p>

                <p>
                    Additionally when you make a purchase or attempt to make a purchase through the Site, we collect
                    certain information from you, including your name, billing address, shipping address, payment
                    information (including credit card numbers), email address, and phone number. We refer to this
                    information as &ldquo;Order Information.&rdquo;
                </p>

                <p>
                    {' '}
                    When we talk about &ldquo;Personal Information&rdquo; in this Privacy Policy, we are talking both
                    about Device Information and Order Information.
                </p>

                <p>HOW DO WE USE YOUR PERSONAL INFORMATION?</p>

                <p>
                    We use the Order Information that we collect generally to fulfill any orders placed through the Site
                    (including processing your payment information, arranging for shipping, and providing you with
                    invoices and/or order confirmations). Additionally, we use this Order Information to: Communicate
                    with you; Screen our orders for potential risk or fraud; and When in line with the preferences you
                    have shared with us, provide you with information or advertising relating to our products or
                    services. We use the Device Information that we collect to help us screen for potential risk and
                    fraud (in particular, your IP address), and more generally to improve and optimize our Site (for
                    example, by generating analytics about how our customers browse and interact with the Site, and to
                    assess the success of our marketing and advertising campaigns).
                </p>

                <p>SHARING YOUR PERSONAL INFORMATION</p>

                <p>
                    We share your Personal Information with third parties to help us use your Personal Information, as
                    described above. For example, we use Shopify to power our online store--you can read more about how
                    Shopify uses your Personal Information here: https://www.shopify.com/legal/privacy. We also use
                    Google Analytics to help us understand how our customers use the Site--you can read more about how
                    Google uses your Personal Information here: https://www.google.com/intl/en/policies/privacy/. You
                    can also opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.
                </p>

                <p>
                    Finally, we may also share your Personal Information to comply with applicable laws and regulations,
                    to respond to a subpoena, search warrant or other lawful request for information we receive, or to
                    otherwise protect our rights.
                </p>

                <p>
                    BEHAVIOURAL ADVERTISING As described above, we use your Personal Information to provide you with
                    targeted advertisements or marketing communications we believe may be of interest to you. For more
                    information about how targeted advertising works, you can visit the Network Advertising
                    Initiative&rsquo;s (&ldquo;NAI&rdquo;) educational page at
                    http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.
                </p>

                <p>You can opt out of targeted advertising by:</p>

                <p>
                    Additionally, you can opt out of some of these services by visiting the Digital Advertising
                    Alliance&rsquo;s opt-out portal at: http://optout.aboutads.info/.
                </p>

                <p>
                    DO NOT TRACK Please note that we do not alter our Site&rsquo;s data collection and use practices
                    when we see a Do Not Track signal from your browser.
                </p>

                <p>
                    YOUR RIGHTS If you are a European resident, you have the right to access personal information we
                    hold about you and to ask that your personal information be corrected, updated, or deleted. If you
                    would like to exercise this right, please contact us through the contact information below.
                </p>

                <p>
                    Additionally, if you are a European resident we note that we are processing your information in
                    order to fulfill contracts we might have with you (for example if you make an order through the
                    Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please
                    note that your information will be transferred outside of Europe, including to Canada and the United
                    States.
                </p>

                <p>
                    DATA RETENTION When you place an order through the Site, we will maintain your Order Information for
                    our records unless and until you ask us to delete this information.
                </p>

                <p>MINORS The Site is not intended for individuals under the age of 10.</p>

                <p>
                    CHANGES We may update this privacy policy from time to time in order to reflect, for example,
                    changes to our practices or for other operational, legal or regulatory reasons.
                </p>

                <p>
                    CONTACT US For more information about our privacy practices, if you have questions, or if you would
                    like to make a complaint, please contact us by e-mail at nicole.ogloza@gmail.com or by mail using
                    the details provided below:
                </p>

                <p> 1452 2nd Ave, Apt 6, New York, NY, 10021, United States</p>
            </Container>
        </div>
    );
};
export default PrivacyPolicy;
