import { User } from '../models';
import { AppDispatch } from '../redux/store';
import { FETCH_USER_TAG, VERIFY_EMAIL } from '../services/API';
import api from '../services/api-helper';

export async function fetchUserByTag(
    userTag: string,
    setFunction: (user: User) => void,
    errorHandler: () => void,
): Promise<void> {
    api.get(FETCH_USER_TAG + `/${userTag}`).then(
        (response) => {
            setFunction(response.data);
        },
        (err) => {
            errorHandler();
            console.log('Error: ', err);
        },
    );
}
//www.etha.one/email-verification?id=1263&secret=65652a45-d82c-4736-b12f-8e784e879107-9501308e-7471-454b-b186-9834a09dbecd&accept=true
export async function verifyEmail(
    userId: number,
    secret: string,
    accept: boolean,
    cleanFunction: (accept: string) => void,
    errorFunction: () => void,
): Promise<void> {
    api.post(
        VERIFY_EMAIL,
        {},
        {
            params: {
                userId: userId,
                secret: secret,
                accept: accept,
            },
        },
    ).then(
        (response) => {
            cleanFunction(response.data);
        },
        (err) => {
            errorFunction();
        },
    );
}
