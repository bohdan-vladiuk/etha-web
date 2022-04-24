import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import DateAdapter from '@mui/lab/AdapterMoment';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getUserDetailsWithToken, editUserDetails, UploadImage } from '../middleware';
import _ from 'lodash';
import { User } from '../models/User';
import { ImageUploadResponse } from '../models';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import moment from 'moment';
import { Camera, CameraResultType } from '@capacitor/camera';
import { toast } from 'react-toastify';
import { dataURLtoFile } from '../util/dataUrlToFile';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { AppNavBar } from '../components/AppNavBar';
import SidePanelLeft from '../components/SidePanelLeft';
import { AppFooter } from '../components/AppFooter';
import SidePanelRight from '../components/SidePanelRight';

export const EditUserProfile: NextPage = () => {
    const dispatch = useAppDispatch();
    const history = useRouter();
    const state = useAppSelector((reduxState) => ({
        signedIn: reduxState.userReducer.signed_in,
        token: reduxState.userReducer.token,
        tag: reduxState.userReducer.tag,
        imageUrl: reduxState.userReducer.imageUrl,
        userName: reduxState.userReducer.name,
        bio: reduxState.userReducer.bio,
        dob: reduxState.userReducer.dob,
        title: reduxState.userReducer.title,
        postData: reduxState.dataReducer.newPosts,
        userId: reduxState.userReducer.user_id,
        name: reduxState.userReducer.name,
        email: reduxState.userReducer.email,
    }));
    const [formData, setFormData] = useState({
        name: state.name,
        imageUrl: state.imageUrl,
        title: state.title,
        bio: state.bio,
        tag: state.tag,
        dob: state.dob,
        email: state.email,
    });
    const handleDateChange = (date: any) => {
        setFormData({
            ...formData,
            dob: moment(date._d).format('YYYY-MM-DD'),
        });
    };
    const handleImageChange = (path: string) => {
        setFormData({
            ...formData,
            imageUrl: path,
        });
    };
    useEffect(() => {
        if (!state.signedIn) {
            history.push('/');
        }
    }, [state.signedIn]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        getUserDetailsWithToken(state.token, dispatch, (user) => {});
    }, [dispatch, state.token]);

    useEffect(() => {
        setFormData({
            name: state.name,
            imageUrl: state.imageUrl,
            title: state.title,
            bio: state.bio,
            dob: state.dob,
            tag: state.tag,
            email: state.email,
        });
        // fetchUserActivityList(state.token || '', activityPage, dispatch);
    }, [state.name, state.tag, state.title, state.dob, state.bio, state.email, state.imageUrl]);

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
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <div
                                className="d-flex w-100 pt-3 mb-3 px-2"
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    flex: 2,
                                }}
                            >
                                <Image src="/icons/back_arr.png" height={40} alt="" onClick={() => history.back()} />
                                <Button
                                    size="sm"
                                    variant="lighter"
                                    style={{ width: '50px !important', color: '#4824d6', fontWeight: 'bolder' }}
                                    onClick={() => {
                                        if (_.isEmpty(formData.name)) {
                                            toast('Your name cannot be empty');
                                        } else if (_.isEmpty(formData.tag)) {
                                            toast('Your User Tag cannot be empty');
                                        } else if (_.isEmpty(formData.dob)) {
                                            toast('Your need to add a Date of Birth to Update the Profile');
                                        } else {
                                            const user: User = {
                                                id: state.userId,
                                                name: formData.name,
                                                imageUrl: formData.imageUrl,
                                                title: formData.title,
                                                tag: formData.tag,
                                                bio: formData.bio as string,
                                                dob: formData.dob,
                                                email: state.email,
                                            };
                                            editUserDetails(
                                                state.token,
                                                user,
                                                dispatch,
                                                () => history.push('/profile'),
                                                () => toast('Your User Tag needs to be unique'),
                                            );
                                        }
                                    }}
                                >
                                    Save
                                </Button>
                            </div>
                            <div className="d-flex w-100" style={{ justifyContent: 'center' }}>
                                <div className="px-4" style={{ width: '100%', minWidth: '210px', maxWidth: '390px' }}>
                                    <div className="w-100 mt-3 ">
                                        <h3>Edit Personal Details </h3>
                                    </div>
                                    <div
                                        className="d-flex w-100 m-0 mt-3"
                                        style={{ position: 'relative', alignItems: 'center' }}
                                    >
                                        <TextField
                                            variant="standard"
                                            className="mb-3"
                                            style={{ borderRadius: '5px', width: '70%' }}
                                            placeholder="Username"
                                            name="name"
                                            aria-label="Username"
                                            value={formData.name}
                                            aria-describedby="basic-addon1"
                                            onChange={handleChange}
                                            label="Name"
                                        />
                                        <div
                                            className="d-flex"
                                            style={{ width: '30%', justifyContent: 'center' }}
                                            onClick={async () => {
                                                // UploadImage

                                                const image = await Camera.getPhoto({
                                                    quality: 90,
                                                    allowEditing: true,
                                                    resultType: CameraResultType.DataUrl,
                                                });
                                                if (image.dataUrl) {
                                                    var imageData = image.dataUrl;
                                                    var imageFormat = image.format;

                                                    const fileName = new Date().getTime() + imageFormat;
                                                    const formData = new FormData();
                                                    formData.append('image', dataURLtoFile(imageData || '', fileName));

                                                    UploadImage(
                                                        formData,
                                                        state.token,
                                                        dispatch,
                                                        (response: ImageUploadResponse) => {
                                                            if (response.success) {
                                                                handleImageChange(response.path);
                                                            }
                                                            console.log(response);
                                                        },
                                                        () => {
                                                            toast(
                                                                'There was an Error uploading the image, please try again',
                                                            );
                                                        },
                                                    );
                                                }
                                            }}
                                        >
                                            <Image
                                                className="profile-image"
                                                src={
                                                    !_.isEmpty(formData.imageUrl)
                                                        ? formData.imageUrl
                                                        : '/user_circle.png'
                                                }
                                                alt=""
                                            />
                                            <i
                                                className="fa fa-camera"
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '0',
                                                    right: '6%',
                                                    color: '#707070',
                                                }}
                                            />
                                        </div>{' '}
                                    </div>

                                    <TextField
                                        variant="standard"
                                        className="w-100 mb-3"
                                        label="Tag"
                                        style={{ borderRadius: '5px' }}
                                        placeholder="Tag"
                                        name="tag"
                                        aria-label="Tag"
                                        value={formData.tag}
                                        aria-describedby="basic-addon1"
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        variant="standard"
                                        className="w-100 mb-3"
                                        label="Bio"
                                        style={{ borderRadius: '5px' }}
                                        placeholder="Enter brief bio"
                                        type="search"
                                        name="bio"
                                        aria-label="Bio"
                                        value={formData.bio as string}
                                        aria-describedby="basic-addon1"
                                        onChange={handleChange}
                                    />

                                    <MobileDatePicker
                                        className="w-100"
                                        label="Date of Birth *"
                                        inputFormat="MM/DD/yyyy"
                                        value={formData.dob}
                                        onChange={(date, event) =>
                                            handleDateChange !== undefined
                                                ? handleDateChange(date || '')
                                                : console.log('Fix your code')
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                className=" w-100 mb-3"
                                                {...params}
                                                variant="standard"
                                                style={{ width: '90%', maxWidth: '390px' }}
                                                error={false}
                                            />
                                        )}
                                    />
                                    <TextField
                                        variant="standard"
                                        className="w-100 mt-3"
                                        label="E-mail"
                                        style={{ borderRadius: '5px' }}
                                        placeholder="E-mail"
                                        name="email"
                                        value={state.email}
                                        aria-describedby="basic-addon1"
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </LocalizationProvider>
                    </Col>
                    <Col className=" d-none d-lg-flex" lg={3}>
                        <SidePanelRight />
                    </Col>
                </Row>
                <AppFooter />
            </Container>
        </>
    );
};
export default EditUserProfile;
