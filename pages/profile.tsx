import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Dropdown, DropdownButton, Image, Row, Spinner } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import { UserActivity } from '../models';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchUserActivityList, getUserDetailsWithToken, signOutUser, fetchUserPosts } from '../middleware';
import InfiniteScroll from 'react-infinite-scroll-component';
import _ from 'lodash';
import { UserActivityEntry } from '../components/UserActivityEntry';
import { useRouter } from 'next/router';
import { AppNavBar } from '../components/AppNavBar';
import SidePanelLeft from '../components/SidePanelLeft';
import SidePanelRight from '../components/SidePanelRight';
import { AppFooter } from '../components/AppFooter';
import { NextPage } from 'next';
import { setModalVisibility } from '../redux';

export const Profile: NextPage = () => {
    const [isLogoutVisible, setLogoutPopup] = useState(false);
    const [isAboutUsVisible, setAboutUsPopup] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useAppDispatch();
    const history = useRouter();
    const state = useAppSelector((reduxState) => ({
        signedIn: reduxState.userReducer.signed_in,
        token: reduxState.userReducer.token,
        userName: reduxState.userReducer.name,
        title: reduxState.userReducer.title,
        dob: reduxState.userReducer.dob,
        tag: reduxState.userReducer.tag,
        bio: reduxState.userReducer.bio,
        imageUrl: reduxState.userReducer.imageUrl,
        userId: reduxState.userReducer.user_id,
        name: reduxState.userReducer.name,
        email: reduxState.userReducer.email,
        agree: reduxState.userReducer.agree,
        disagree: reduxState.userReducer.disagree,
        commentCount: reduxState.userReducer.commentCount,
        userActivityData: reduxState.dataReducer.userActivityData,
    }));

    const contentStyle = {
        background: '#ffffff',
        borderRadius: '25px',
        padding: '5px 10px',
    };
    const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
    const arrowStyle = { color: '#f03792' }; // style for an svg element

    useEffect(() => {
        getUserDetailsWithToken(state.token, dispatch, (user) => {});
    }, [dispatch, state.token]);

    useEffect(() => {
        refresh();
    }, []);
    useEffect(() => {
        if (!state.signedIn) {
            history.push('/home');
        }
    }, [state.signedIn]);

    useEffect(() => {
        fetchUserActivityList(state.token, currentPage, dispatch);
    }, [currentPage, dispatch, state.token]);

    function fetchMoreData() {
        setCurrentPage(currentPage + 1);
    }

    function refresh() {
        setCurrentPage(0);
    }
    return (
        <>
            <AppNavBar />
            <Container
                style={{
                    paddingTop: '100px',
                    width: '100%',
                }}
            >
                <Row>
                    <Col className=" d-none d-lg-flex" lg={3}>
                        <SidePanelLeft />
                    </Col>
                    <Col lg={6}>
                        <div
                            className="d-flex w-100 pb-2"
                            style={{
                                alignItems: 'center',
                                width: '100%',
                                justifyContent: 'space-between',
                                position: 'relative',
                                top: 0,
                            }}
                        >
                            <div
                                className="w-100 "
                                style={{
                                    paddingTop: '5px',
                                    background: '#fefefe',
                                    borderRadius: '35px',
                                    boxShadow: '1px 1px 10px 1px #00000070',
                                }}
                            >
                                <div className="d-flex w-100 pb-2 px-2" style={{ justifyContent: 'start' }}>
                                    <Image
                                        className="profile-image-container"
                                        src={!_.isEmpty(state.imageUrl) ? state.imageUrl : '/user_circle.png'}
                                        alt=""
                                    />

                                    <div style={{ marginLeft: '20px' }}>
                                        <p className="profile-title p-0 m-0">{state.name}</p>
                                        <p className="profile-bio p-0 m-0"> {state.bio} </p>
                                    </div>
                                    <DropdownButton
                                        className="my-dropdown p-0 m-0"
                                        style={{ position: 'absolute', top: '12%', right: '5%' }}
                                        variant="light-dropdown"
                                        title={
                                            <i className="fa fa-ellipsis-v" style={{ fontSize: '24px !important' }}></i>
                                        }
                                    >
                                        <Dropdown.Item as="button">
                                            <Button
                                                variant="primary w-100 my-0"
                                                onClick={() => {
                                                    // setEditPopup(true);
                                                    history.push('/edit-profile');
                                                }}
                                            >
                                                <i className="fa fa-pencil-square-o"></i> &nbsp;Edit
                                            </Button>
                                        </Dropdown.Item>
                                        <Dropdown.Item as="button">
                                            <Button
                                                variant="primary w-100 my-0"
                                                onClick={() => {
                                                    setLogoutPopup(true);
                                                }}
                                            >
                                                <i className="fa fa-sign-out"></i>&nbsp; Log Out
                                            </Button>
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item as="button">
                                            <Button
                                                variant="primary w-100 my-0"
                                                onClick={() => {
                                                    setAboutUsPopup(true);
                                                }}
                                            >
                                                <i className="fa fa-info" />
                                                &nbsp;&nbsp; About
                                            </Button>
                                        </Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            </div>
                        </div>

                        <h6 className="m-2"> Your Activity </h6>
                        <hr />

                        <div className="d-flex w-100 mx-auto" style={{ textAlign: 'center', justifyContent: 'center' }}>
                            <div
                                style={{
                                    flexGrow: 1,
                                    flexDirection: 'column',
                                    overflowX: 'hidden',
                                    overflowY: 'hidden',
                                }}
                            >
                                <InfiniteScroll
                                    dataLength={
                                        !_.isEmpty(state.userActivityData.content)
                                            ? Object.keys(state.userActivityData.content).length
                                            : 0
                                    }
                                    className="d-flex w-100"
                                    style={{ flexWrap: 'wrap', justifyContent: 'center', marginBottom: '90px' }}
                                    next={fetchMoreData}
                                    hasMore={state.userActivityData.totalPages > currentPage}
                                    loader={
                                        <div className="d-flex w-100" style={{ justifyContent: 'center' }}>
                                            <Spinner
                                                className="my-2"
                                                animation="border"
                                                role="status"
                                                variant="secondary"
                                            />
                                        </div>
                                    }
                                    initialScrollY={0}
                                    refreshFunction={refresh}
                                    pullDownToRefreshThreshold={50}
                                    pullDownToRefreshContent={
                                        <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                                    }
                                    releaseToRefreshContent={
                                        <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                                    }
                                >
                                    {!_.isEmpty(state.userActivityData.content) &&
                                        state.userActivityData.content.map((activity: UserActivity, index: number) => {
                                            return <UserActivityEntry key={index} activity={activity} />;
                                        })}
                                </InfiniteScroll>
                            </div>
                        </div>
                        <Popup
                            open={isLogoutVisible}
                            onClose={() => {
                                setLogoutPopup(false);
                            }}
                            position="left center"
                            {...{ contentStyle, overlayStyle, arrowStyle }}
                        >
                            {' '}
                            <div className="text-center w-100 m-auto py-2" style={{}}>
                                <h5 className="mt-3 px-3" style={{ textAlign: 'center' }}>
                                    Are you sure you want to logout?
                                </h5>
                            </div>{' '}
                            <div
                                className="d-flex w-100 px-3 mt-3 mb-3"
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: 2,
                                }}
                            >
                                <Button
                                    variant="cancel py-2 mr-1"
                                    size="sm"
                                    style={{
                                        width: '100px',
                                    }}
                                    onClick={() => {
                                        setLogoutPopup(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary mb-1"
                                    onClick={() => {
                                        signOutUser(dispatch, () => {
                                            history.push('/');
                                        });
                                    }}
                                >
                                    {'Log Out'}
                                </Button>
                            </div>
                        </Popup>

                        <Popup
                            open={isAboutUsVisible}
                            onClose={() => {
                                setAboutUsPopup(false);
                            }}
                            position="left center"
                            {...{ contentStyle, overlayStyle, arrowStyle }}
                        >
                            <div className="py-3" style={{ width: '320px', minWidth: '210px' }}>
                                <div className="text-center w-100 m-auto py-2" style={{}}>
                                    <Image src="/etha_logo.svg" alt="" height="60px" />
                                </div>{' '}
                                <div className="text-center w-100 m-auto py-2" style={{}}>
                                    <p
                                        className="mt-1 px-3"
                                        style={{ fontSize: '14px', textAlign: 'justify', textJustify: 'inter-word' }}
                                    >
                                        Inspired by past presidential elections and the widespread control that the
                                        media had during the COVID-19 pandemic, Etha was founded in January 2021 and is
                                        led by co-founders Nicole Ogloza and Aastik Saini. Etha is driven by the need to
                                        provide a platform that can provide intelligent political discourse and
                                        objective reality for users.
                                    </p>
                                </div>
                                <div className="text-center w-100 m-auto py-2" style={{}}>
                                    <Button
                                        variant="primary py-2 "
                                        size="sm"
                                        style={{
                                            width: '100px',
                                        }}
                                        onClick={() => {
                                            setAboutUsPopup(false);
                                        }}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </Popup>
                    </Col>
                    <Col className=" d-none d-lg-flex" lg={3}>
                        {/* <SidePanelRight /> */}
                    </Col>
                </Row>
                <AppFooter />
            </Container>
        </>
    );
};
export default Profile;
