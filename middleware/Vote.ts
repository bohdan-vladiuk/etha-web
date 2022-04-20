// Dependencies

// Components
import { GET_VOTE_DETAIL, GET_VOTES_DETAIL, GET_VOTES_LIST, SET_VOTES, GET_VOTE_COUNT } from '../services/API';
import { PostVoteRequest, VoteCount, Vote, VotingDetails, PutVoteRequest } from '../models';
import api from '../services/api-helper';
import { AppDispatch } from '../redux/store';
import { setLoaderVisibility } from '../redux';
import { firebaseAnalytics } from '../auth/firebaseClient';

export async function fetchVoteList(postId: string, returnFunction: (votes: Vote[]) => void): Promise<void> {
    api.get(GET_VOTES_LIST, {
        params: {
            postId: postId,
        },
    }).then(
        (response) => {
            returnFunction(response.data);
        },
        (err) => {
            console.log('Error: ', err);
        },
    );
}

export async function fetchVoteCount(returnFunction: (voteCount: VoteCount) => void): Promise<void> {
    api.get(GET_VOTE_COUNT).then(
        (response) => {
            returnFunction(response.data);
        },
        (err) => {
            console.log('Error: ', err);
        },
    );
}

export async function fetchVotingDetails(
    postId: string,
    returnFunction: (votingDetails: VotingDetails) => void,
): Promise<void> {
    api.get(GET_VOTES_DETAIL, {
        params: {
            postId: postId,
        },
    }).then(
        (response) => {
            returnFunction(response.data);
        },
        (err) => {
            console.log('Error: ', err);
        },
    );
}

export async function fetchUserVoteDetails(
    token: string,
    postId: string,
    returnFunction: (userVote: Vote) => void,
): Promise<void> {
    api.get(GET_VOTE_DETAIL, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
            postId: postId,
        },
    }).then(
        (response) => {
            returnFunction(response.data);
        },
        (err) => {
            returnFunction(err);
            console.log('Error: ', err);
        },
    );
}

export async function postVote(
    token: string,
    userId: string,
    postVoteRequest: PostVoteRequest,
    dispatch: AppDispatch,
    setFunction: (voteCount: VoteCount) => void,
): Promise<void> {
    dispatch(setLoaderVisibility(true));

    const config = { headers: { Authorization: `Bearer ${token}` } };
    api.post(SET_VOTES, postVoteRequest, config)
        .then(
            (response) => {
                firebaseAnalytics.logEvent('vote_submit_success', {
                    userId: userId,
                    statementId: postVoteRequest.postId,
                    value: postVoteRequest.value,
                });
                setFunction(response.data);
            },
            (err) => {
                console.log('Error: ', err);
            },
        )
        .finally(() => {
            dispatch(setLoaderVisibility(false));
        });
}

export async function updateVote(
    token: string,
    postVoteRequest: PutVoteRequest,
    setFunction: (vote: Vote) => void,
): Promise<void> {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    api.put(SET_VOTES, postVoteRequest, config).then(
        (response) => {
            setFunction(response.data);
        },
        (err) => {
            console.log('Error: ', err);
        },
    );
}

// export async function fetchPublicFigureVotes(
//     userId: string,
//     setFunction: (userVotes: VoteCount) => void,
// ): Promise<void> {
//     api.get(GET_VOTES_PUBLIC_FIGURE, {
//         params: {
//             userId: userId,
//         },
//     }).then(
//         (response) => {
//             setFunction(response.data);
//         },
//         (err) => {
//             console.log('Error: ', err);
//         },
//     );
// }

// export async function fetchUserVotes(
//     token: string,
//     setFunction: (publicFigureVotes: VoteCount) => void,
// ): Promise<void> {
//     api.get(GET_USER_VOTE_COUNT, {
//         headers: { Authorization: `Bearer ${token}` },
//     }).then(
//         (response) => {
//             setFunction(response.data);
//         },
//         (err) => {
//             console.log('Error: ', err);
//         },
//     );
// }
