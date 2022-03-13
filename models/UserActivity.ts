import { Post, Vote } from '.';

export interface UserActivity {
    id: string;
    postId: string;
    post: Post;
    voteId: string;
    vote: Vote;
    commentId: string;
    comment: Comment;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserActivityResponse {
    id: string;
    postId: string;
    post: Post;
    voteId: string;
    vote: Vote;
    commentId: string;
    comment: Comment;
}
