import { AnyAction } from 'redux';
import { IDataState } from './interfaces';
import * as types from './types';

const initialState: IDataState = {
    userData: [],
    newPosts: {},
    hotPosts: {},
    searchPosts: [],
    userPosts: {},
    commentData: {},
    userActivityData: {},
};

function DataReducer(state = initialState, action: AnyAction): IDataState {
    switch (action.type) {
        case types.SET_USERS: {
            return {
                ...state,
                userData: action.usersList,
            };
        }
        case types.SET_POSTS: {
            switch (action.postType) {
                case 'new':
                    if (action.page === 0) {
                        return {
                            ...state,
                            newPosts: action.postData,
                        };
                    } else {
                        const tempContent = state.newPosts.content.concat(action.postData.content);
                        action.postData.content = tempContent;
                        return {
                            ...state,
                            newPosts: action.postData,
                        };
                    }
                    break;
                case 'hot':
                    if (action.page === 0) {
                        return {
                            ...state,
                            hotPosts: action.postData,
                        };
                    } else {
                        const tempContent = state.hotPosts.content.concat(action.postData.content);
                        action.postData.content = tempContent;
                        return {
                            ...state,
                            hotPosts: action.postData,
                        };
                    }
                    break;

                case 'search':
                    if (action.page === 0) {
                        return {
                            ...state,
                            searchPosts: action.postData,
                        };
                    } else {
                        const tempContent = state.searchPosts.hits.concat(action.postData.hits);
                        action.postData.content = tempContent;
                        return {
                            ...state,
                            searchPosts: action.postData,
                        };
                    }
                    break;
                case 'public-figure':
                    if (action.page === 0) {
                        return {
                            ...state,
                            userPosts: action.postData,
                        };
                    } else {
                        const tempContent = state.userPosts.content.concat(action.postData.content);
                        action.postData.content = tempContent;
                        return {
                            ...state,
                            userPosts: action.postData,
                        };
                    }
            }
            return {
                ...state,
            };
        }
        case types.SET_COMMENTS: {
            if (action.page === 0) {
                return {
                    ...state,
                    commentData: action.commentData,
                };
            } else {
                const tempContent = state.commentData.content.concat(action.commentData.content);
                action.commentData.content = tempContent;
                return {
                    ...state,
                    commentData: action.commentData,
                };
            }
        }
        case types.SET_USER_ACTIVITY_DATA: {
            if (action.page === 0) {
                return {
                    ...state,
                    userActivityData: action.userActivityData,
                };
            } else {
                const tempContent = state.userActivityData.content.concat(action.userActivityData.content);
                action.userActivityData.content = tempContent;
                return {
                    ...state,
                    userActivityData: action.userActivityData,
                };
            }
        }
        default: {
            return {
                ...state,
            };
        }
    }
}
export default DataReducer;
