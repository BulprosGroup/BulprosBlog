import { Action } from '@ngrx/store';

import { BlogPost } from './blog-post';

export const SET_AVAILABLE_BLOG_POSTS = '[BlogPosts] Set Available Blog Posts';

export class SetAvailableBlogPosts implements Action {
    readonly type = SET_AVAILABLE_BLOG_POSTS;

    constructor(public payload: BlogPost[]) {}
}

export type BlogPostActions = SetAvailableBlogPosts;