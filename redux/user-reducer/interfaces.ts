export interface IUserState {
    signed_in: boolean;
    token: string;
    user_id: string | undefined;
    email?: string;
    name?: string;
    agree?: number;
    disagree?: number;
    commentCount?: number;
}

export interface UserAction {
    type: string;
    id?: string;
    token?: string;
    email?: string;
    name?: string;
    password?: string;
    agree?: number;
    disagree?: number;
    commentCount?: number;
}
