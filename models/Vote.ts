export interface Vote {
    id?: string;
    userId: string;
    postId: string;
    value?: boolean;
}

export interface VotingDetails {
    postId: string;
    yes: number;
    no: number;
}

export interface PostVoteRequest {
    postId: string;
    value: boolean;
}

export interface PutVoteRequest {
    id: string;
    value: boolean;
}
export interface VoteCount {
    postId: string;
    agree: number;
    disagree: number;
}
