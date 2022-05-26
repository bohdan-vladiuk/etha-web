import { baseUrl, OAUTH2_REDIRECT_URI } from './api-helper';

export const WAITLIST_SUBMIT = `${baseUrl}/contact-us/wait-list`;
export const SUBSCRIBE_NEWSLETTER = `${baseUrl}/contact-us/subscribe`;
export const UNSUBSCRIBE_NEWSLETTER = `${baseUrl}/contact-us/unsubscribe`;

export const SIGN_IN_USER = `${baseUrl}/auth/login`;
export const SET_USER_DETAILS = `${baseUrl}/user/me`;
export const SIGN_UP_USER = `${baseUrl}/auth/signup`;
export const CHECK_USER = `${baseUrl}/user/check`;
export const TOKEN_GET_USER_DETAILS = `${baseUrl}/user/me`;

export const UPLOAD_IMAGE = `${baseUrl}/image`;

export const CONTACT_US_SUBMIT = `${baseUrl}/contact-us`;
export const FETCH_USER = `${baseUrl}/user`;
export const FETCH_USER_TAG = `${baseUrl}/user/tag`;
export const FETCH_ALL_USER_TAGS = `${baseUrl}/user/findAllTags`;
export const SEARCH_USERS = `${baseUrl}/user/search`;

export const REQUEST_VERIFY_EMAIL = `${baseUrl}/user/request-email-verify`;
export const VERIFY_EMAIL = `${baseUrl}/user/verify-email`;
export const GET_HASHTAGS = `${baseUrl}/hashtag`;
export const SET_HASHTAGS = `${baseUrl}/hashtag/follow`;
export const GET_POST = `${baseUrl}/post`;
export const GET_POST_TAG = `${baseUrl}/post/tag`;
export const GET_ALL_POST_TAGS = `${baseUrl}/post/findAllTags`;
export const CREATE_POST = `${baseUrl}/post`;
export const EDIT_POST = `${baseUrl}/post`;
export const DELETE_POST = `${baseUrl}/post`;
export const GET_NEW_POSTS = `${baseUrl}/post/new`;
export const GET_HOT_POSTS = `${baseUrl}/post/hot`;
export const SEARCH_POSTS = `${baseUrl}/post/search`;
export const PUBLIC_FIGURE_POSTS = `${baseUrl}/post/user`;
export const GET_POSTS_COUNT = `${baseUrl}/post/count`;

export const GET_COMMENTS = `${baseUrl}/comment`;
export const POST_COMMENTS = `${baseUrl}/comment`;
export const EDIT_COMMENTS = `${baseUrl}/comment`;
export const DELETE_COMMENTS = `${baseUrl}/comment`;
export const GET_COMMENTS_LIST = `${baseUrl}/comment`;
export const GET_USER_COMMENT_COUNT = `${baseUrl}/comment/count/user`;

export const SET_VOTES = `${baseUrl}/vote`;
export const DELETE_VOTE = `${baseUrl}/vote`;
export const GET_VOTE_DETAIL = `${baseUrl}/vote/detail`;
export const GET_VOTE_COUNT = `${baseUrl}/vote/count`;
export const EDIT_VOTES = `${baseUrl}/vote`;
export const GET_VOTES_LIST = `${baseUrl}/vote/list`;
export const GET_VOTES_DETAIL = `${baseUrl}/vote/list/detail`;
export const SET_COMMENT_REACTION = `${baseUrl}/comment-reaction`;

export const GET_USER_ACTIVITY_LIST = `${baseUrl}/user-activity`;

export const GOOGLE_AUTH_URL = baseUrl + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = baseUrl + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const APPLE_AUTH_URL = baseUrl + '/oauth2/authorize/apple?redirect_uri=' + OAUTH2_REDIRECT_URI;
