import { User } from '.';

export interface Comment {
    id?: string;
    userId: string;
    user: User;
    userName?: string;
    postId?: string;
    text?: string;
    createdAt: Date;
}

export interface CommentRequest {
    id?: string;
    userId?: string;
    postId: string;
    text: string;
}
