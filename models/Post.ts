import { User, VoteCount } from '.';

export interface Post {
    id?: string;
    tag?: string;
    userId?: string;
    user?: User;
    text?: string;
    source?: string;
    location?: string;
    voteCount?: VoteCount;
    userVote?: boolean;
}
