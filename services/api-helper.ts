import axios from 'axios';

//TODO MAKE changes before deployment

const REACT_APP_API_URL_DEV = `https://dev.etha.one/api`;
// const REACT_APP_API_URL_DEV = `http://localhost:8080`;
const REACT_APP_API_URL_PROD = `https://prod.etha.one/api`;

const REACT_APP_URL_DEV = `http://localhost:3000`;
const REACT_APP_URL_PROD = `https://etha.one`;
export const baseUrl =
    process.env.REACT_APP_DEPLOY_ENV === 'prod' ? `${REACT_APP_API_URL_PROD}` : `${REACT_APP_API_URL_DEV}`;

export const OAUTH2_REDIRECT_URI =
    process.env.REACT_APP_DEPLOY_ENV === 'prod'
        ? `${REACT_APP_URL_PROD}/oauth2/redirect`
        : `${REACT_APP_URL_DEV}/oauth2/redirect`;
const api = axios.create({
    baseURL: baseUrl,
});

export default api;
