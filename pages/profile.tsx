import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../styles/PostCard.module.css';
import Image from 'next/image';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../redux/store';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, Col, Dropdown, FormControl, Spinner } from 'react-bootstrap';
import {
    editUserDetails,
    fetchNewPosts,
    fetchUserActivityList,
    getUserDetailsWithToken,
    singOutUser,
} from '../middleware';
import { Post, User, UserActivity } from '../models';
import { PostCard } from '../components/PostCard';
import _ from 'lodash';
import Popup from 'reactjs-popup';
import { UserActivityEntry } from '../components/UserActivityEntry';

const Profile: NextPage = () => {
    const [isLogoutVisible, setLogoutPopup] = useState(false);
    const [isEditVisible, setEditPopup] = useState(false);
    const [isAboutUsVisible, setAboutUsPopup] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);

    const dispatch = useAppDispatch();
    const history = useRouter();
    const state = useAppSelector((reduxState) => ({
        token: reduxState.userReducer.token,
        userId: reduxState.userReducer.user_id,
        name: reduxState.userReducer.name,
        email: reduxState.userReducer.email,
        agree: reduxState.userReducer.agree,
        disagree: reduxState.userReducer.disagree,
        commetnCount: reduxState.userReducer.commentCount,
        userActivityData: reduxState.dataReducer.userActivityData,
    }));
    const [formData, setFormData] = useState({
        name: state.name,
        email: state.email,
    });
    const contentStyle = {
        background: '#ffffff',
        borderRadius: '25px',
        padding: '5px 10px',
    };
    const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
    const arrowStyle = { color: '#f03792' }; // style for an svg element
    useEffect(() => {
        ReactGA.event({
            category: 'page_load',
            action: `Profile Page`,
            dimension1: state.userId,
            dimension7: 'Profile',
        });
    }, [state.userId]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            name: e.target.value,
        });
    };

    useEffect(() => {
        if (!isEditVisible) {
            getUserDetailsWithToken(state.token, dispatch);
        }
    }, [isEditVisible, dispatch, state.token]);

    useEffect(() => {
        setFormData({
            name: state.name,
            email: state.email,
        });
        // fetchUserActivityList(state.token || '', activityPage, dispatch);
    }, [state.name, state.email]);

    useEffect(() => {
        refresh();
    }, []);

    useEffect(() => {
        fetchUserActivityList(state.token, currentPage, dispatch);
    }, [currentPage, dispatch, state.token]);

    function fetchMoreData() {
        setCurrentPage(currentPage + 1);
    }

    function refresh() {
        setCurrentPage(0);
        // dispatch(setLoaderVisibility(true));
    }
    return (
        <div className="d-flex w-100" style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '30px' }}>
            <div className={styles.profile_container}>
                <div className="d-flex w-100 m-auto">
                    <Image className="image-container" src="/user_circle.png" alt="" height={50} width={50} />
                    <div
                        style={{
                            display: 'flex',
                            flex: 1,
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            className="d-flex w-100 h-100"
                            style={{ color: 'black', height: '100%', alignItems: 'center', flexDirection: 'row' }}
                        >
                            <div className="w-100 text-center">
                                <div className="public-figure-title m-auto pb-1">{state.name}</div>
                                <div className="public-figure-bio m-auto">{state.email}</div>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Dropdown className="mr-3 w-50 text-center">
                            <Dropdown.Toggle
                                className={`${styles.my_dropdown} w-100`}
                                style={{ color: '#707070 !important', backgroundColor: '#FFFFFF00 !important' }}
                                split={false}
                            >
                                <i className="fa fa-ellipsis-v"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as="button">
                                    <Button
                                        variant="submit-primary w-100"
                                        onClick={() => {
                                            setEditPopup(true);
                                        }}
                                    >
                                        <i className="fa fa-pencil-square-o"></i> Edit
                                    </Button>
                                </Dropdown.Item>
                                <Dropdown.Item as="button">
                                    <Button
                                        variant="submit-primary w-100"
                                        onClick={() => {
                                            setLogoutPopup(true);
                                        }}
                                    >
                                        <i className="fa fa-sign-out"></i> Log Out
                                    </Button>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                {/* <hr />
                <div className="d-flex w-100" style={{ textAlign: 'center', justifyContent: 'center' }}>
                    <hr />
                    <div>
                        <span>
                            <span>{state.agree}</span> <br />
                            Agrees
                        </span>
                    </div>
                    &emsp;
                    <hr />
                    <div style={{ height: 50, width: 0.7, backgroundColor: 'black' }}></div>
                    <hr />
                    &emsp;
                    <div>
                        <a>
                            <span title="227"> {state.disagree}</span> <br /> Disagrees
                        </a>
                    </div>
                    &emsp;
                    <hr />
                    <div style={{ height: 50, width: 1, backgroundColor: 'black' }}></div>
                    <hr />
                    &emsp;
                    <div>
                        <a>
                            <span>{state.commetnCount}</span> <br /> Comments
                        </a>
                    </div>
                    <hr />
                </div>
                <hr /> */}

                <hr />
                <h6> Your Activity </h6>
                <div className="d-flex w-100 mx-auto" style={{ textAlign: 'center', justifyContent: 'center' }}>
                    <div className="search-container mx-auto p-0">
                        <div
                            className="py-3 px-1"
                            style={{
                                flexGrow: 1,
                                flexDirection: 'column',
                                overflowX: 'hidden',
                                overflowY: 'hidden',
                            }}
                        >
                            <InfiniteScroll
                                style={{ paddingBottom: '100px' }}
                                dataLength={
                                    !_.isEmpty(state.userActivityData.content)
                                        ? Object.keys(state.userActivityData.content).length
                                        : 0
                                }
                                next={fetchMoreData}
                                hasMore={state.userActivityData.totalPages - 1 > currentPage}
                                loader={
                                    <>
                                        <Spinner
                                            className="my-2"
                                            animation="border"
                                            role="status"
                                            variant="secondary"
                                        />
                                    </>
                                }
                                initialScrollY={0}
                                refreshFunction={refresh}
                                pullDownToRefresh
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
                        variant="submit-primary mb-1"
                        onClick={() => {
                            singOutUser(dispatch, () => {
                                history.push('/');
                            });
                        }}
                    >
                        {'Log Out'}
                    </Button>
                </div>
            </Popup>
            <Popup
                open={isEditVisible}
                onClose={() => {
                    setEditPopup(false);
                }}
                position="left center"
                {...{ contentStyle, overlayStyle, arrowStyle }}
            >
                <div style={{ width: '300px', minWidth: '210px' }}>
                    <div className="text-center w-100 mt-3 ">
                        <h3>Edit Account </h3>
                    </div>
                    <div className="d-flex w-100 pl-2">
                        <h6>Name</h6>
                    </div>

                    <FormControl
                        className="mb-3"
                        style={{ borderRadius: '5px' }}
                        placeholder="Username"
                        aria-label="Username"
                        value={formData.name}
                        aria-describedby="basic-addon1"
                        onChange={handleChange}
                    />
                    <div className="d-flex w-100 pl-2">
                        <h6>Email:</h6>
                    </div>

                    <FormControl
                        className="mb-3"
                        style={{ borderRadius: '5px' }}
                        placeholder="Email"
                        aria-label="Email"
                        value={state.email}
                        aria-describedby="basic-addon1"
                        readOnly={true}
                    />
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
                                setEditPopup(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="submit-primary py-2 ml-1"
                            size="sm"
                            style={{
                                width: '100px',
                            }}
                            onClick={() => {
                                const user: User = {
                                    id: state.userId,
                                    name: formData.name,
                                    email: state.email,
                                };
                                editUserDetails(
                                    state.token,
                                    user,
                                    dispatch,
                                    () => setEditPopup(false),
                                    () => {
                                        console.log('Error');
                                    },
                                );
                            }}
                        >
                            Save
                        </Button>
                    </div>
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
                        <Image src="/logo_square.jpg" alt="" height="100px" />
                    </div>{' '}
                    <div className="text-center w-100 m-auto py-2" style={{}}>
                        <p
                            className="mt-3 px-3"
                            style={{ fontSize: '14px', textAlign: 'justify', textJustify: 'inter-word' }}
                        >
                            Inspired by past presidential elections and the widespread control that the media had during
                            the COVID-19 pandemic, Etha was founded in January 2021 and is led by co-founders Nicole
                            Ogloza and Aastik Saini. Etha is driven by the need to provide a platform that can provide
                            intelligent political discourse and objective reality for users.
                        </p>
                    </div>
                </div>
            </Popup>
        </div>
    );
};

export default Profile;
