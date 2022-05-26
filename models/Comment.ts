import { User } from '.';

export interface Comment {
    id?: string;
    userId: string;
    user: User;
    userName?: string;
    text?: string;
    replies: Array<Comment>,
    postId?: string;
    createdAt: Date;
    reactionCount: ReactionCount;
    userReaction?: boolean;
}

export interface CommentRequest {
    id?: string;
    userId?: string;
    postId: string;
    text: string;
}
export interface ReactionCount {
    commentId: string;
    like: number;
    dislike: number;
}

export interface CommentReactionRequest {
    commentId: string;
    value: boolean;
}
