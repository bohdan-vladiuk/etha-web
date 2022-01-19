export interface IDataState {
    userData: any;
    newPosts: any;
    hotPosts: any;
    searchPosts: any;
    userPosts: any;
    commentData: any;
    userActivityData: any;
}

export interface SetUserPosts {
    type: string;
    usersList: any;
}

export interface SetPostAction {
    type: string;
    page: number;
    postType: 'new' | 'hot' | 'search' | 'public-figure';
    postData: any;
}

export interface SetCommentAction {
    type: string;
    page: number;
    commentData: any;
}

export interface SetUserActiivityAction {
    type: string;
    page: number;
    userActivityData: any;
}
