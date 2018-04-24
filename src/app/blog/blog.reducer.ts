import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import {
    BlogPostActions,
    SET_AVAILABLE_BLOG_POSTS
} from './blog.actions';
import { BlogPost } from './blog-post';
import * as fromRoot from '../app.reducer';

export interface BlogPostsState {
    blogPosts: BlogPost[]
}

export interface State extends fromRoot.State {
    blogPosts: BlogPostsState
}

const initialState: BlogPostsState = {
    blogPosts: []
};

export function blogPostsReducer(state = initialState, action: BlogPostActions) {
    switch (action.type) {
        case SET_AVAILABLE_BLOG_POSTS:
            return {
                blogPosts: action.payload
            }

        default:
            return state;
    }
}

export const getblogPostState = createFeatureSelector<BlogPostsState>('blogPosts');

export const getAvailableBlogPosts = createSelector(getblogPostState, (state: BlogPostsState) => state.blogPosts);