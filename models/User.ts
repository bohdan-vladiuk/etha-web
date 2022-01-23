import { VoteCount } from '.';

export interface User {
    id?: string;
    name?: string;
    email?: string;
    imageUrl?: string;
    tag?: string;
    slug?: string;
    title?: string;
    bio?: string;
    password?: string;
    voteCount?: VoteCount;
}
