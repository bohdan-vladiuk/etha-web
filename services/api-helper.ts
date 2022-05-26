import axios from 'axios';

//TODO MAKE changes before deployment

const NEXT_PUBLIC_API_URL_DEV = `https://dev.etha.one`;
// const NEXT_PUBLIC_API_URL_DEV = `http://localhost:8080`;
const NEXT_PUBLIC_API_URL_PROD = `https://prod.etha.one/api`;

const NEXT_PUBLIC_URL_DEV = `http://localhost:3000`;
const NEXT_PUBLIC_URL_PROD = `https://etha.one`;
export const baseUrl =
    process.env.NEXT_PUBLIC_DEPLOY_ENV === 'prod' ? `${NEXT_PUBLIC_API_URL_PROD}` : `${NEXT_PUBLIC_API_URL_DEV}`;

export const OAUTH2_REDIRECT_URI =
    process.env.NEXT_PUBLIC_DEPLOY_ENV === 'prod'
        ? `${NEXT_PUBLIC_URL_PROD}/oauth2/redirect`
        : `${NEXT_PUBLIC_URL_DEV}/oauth2/redirect`;
const api = axios.create({
    baseURL: baseUrl,
});

export default api;
