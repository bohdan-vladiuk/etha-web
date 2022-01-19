import { Post } from '../models';
import { GET_POST_TAG } from '../services/API';
import api from '../services/api-helper';

export async function fetchPostDetailsByTag(
    postTag: string,
    token: string,
    setFunction: (post: Post) => void,
    onError: () => void,
): Promise<void> {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    api.get(GET_POST_TAG + `/${postTag}`, config).then(
        (response) => {
            setFunction(response.data);
        },
        (err) => {
            onError();
            console.log('Error: ', err);
        },
    );
}
