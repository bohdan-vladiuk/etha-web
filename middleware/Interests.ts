import { setHashtags } from '../redux';
import { AppDispatch } from '../redux/store';
import { GET_HASHTAGS, SET_HASHTAGS } from '../services/API';
import api from '../services/api-helper';

export async function getUserInterests(
    token: string,
    dispatch: AppDispatch,
    cleanFunction: (response: string[]) => void,
) {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    api.get(GET_HASHTAGS, config)
        .then(
            (response) => {
                if (response.data) {
                    dispatch(setHashtags(response.data));
                    cleanFunction(response.data);
                }
            },
            (err) => {
                cleanFunction([]);
            },
        )
        .finally(() => {});
}
export async function setUserInterests(token: string, interests: string[], dispatch: AppDispatch) {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    api.post(SET_HASHTAGS, interests, config).then(
        (response) => {
            if (response.data) {
                getUserInterests(token, dispatch, () => {});
            }
        },
        (err) => {
            console.log('Error: ' + err);
        },
    );
}
