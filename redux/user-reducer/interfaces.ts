export interface IUserState {
    signed_in: boolean;
    token: string;
    imageUrl?: string;
    user_id: string | undefined;
    email?: string;
    name?: string;
    title?: string;
    bio?: string;
    tag?: string;
    dob?: string;
    agree?: number;
    disagree?: number;
    emailVerified?: boolean;
    role?: string;
    commentCount?: number;
    isFirstLoad?: boolean;
    hashtags?: string[];
}

export interface UserAction {
    type: string;
    id?: string;
    token?: string;
    imageUrl?: string;
    email?: string;
    name?: string;
    password?: string;
    bio?: string;
    title?: string;
    tag?: string;
    dob?: string;
    agree?: number;
    disagree?: number;
    emailVerified?: boolean;
    role?: string;
    commentCount?: number;
    isFirstLoad?: boolean;
    hashtags?: string[];
}
