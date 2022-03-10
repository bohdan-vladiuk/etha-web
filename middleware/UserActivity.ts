// Components
import { GET_USER_ACTIVITY_LIST } from '../services/API';
import { AppDispatch } from '../redux/store';
import { setLoaderVisibility, setUserActivityData } from '../redux';
import api from '../services/api-helper';

export async function fetchUserActivityList(token: string, page: number, dispatch: AppDispatch): Promise<void> {
    if (page === 0) {
        dispatch(setLoaderVisibility(true));
    }
    api.get(GET_USER_ACTIVITY_LIST, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
            page: page,
            size: 16,
        },
    })
        .then(
            (response) => {
                dispatch(setUserActivityData(page, response.data));
            },
            (err) => {
                setUserActivityData(0, {});
                console.log('Error: ', err);
            },
        )
        .finally(() => {
            dispatch(setLoaderVisibility(false));
        });
}
