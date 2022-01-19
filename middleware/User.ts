import { User } from '../models';
import { FETCH_USER_TAG } from '../services/API';
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
