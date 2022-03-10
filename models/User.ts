import { VoteCount } from '.';

export interface User {
    id?: string;
    name?: string;
    email?: string;
    imageUrl?: string;
    tag?: string;
    dob?: string;
    phone?: string;
    emailVerified?: boolean;
    title?: string;
    bio?: string;
    password?: string;
    role?: string;
    voteCount?: VoteCount;
}

export interface ImageUploadRequest {
    image: File;
}

export interface ImageUploadResponse {
    success: boolean;
    path: string;
}
