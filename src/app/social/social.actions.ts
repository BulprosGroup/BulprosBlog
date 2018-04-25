import { Action } from '@ngrx/store';
import { FacebookPost } from './facebook/facebookPost.model';

export const SET_FB_POSTS = '[Social] Set FB Posts';

export class SetFbPosts implements Action {
    readonly type = SET_FB_POSTS;

    constructor(public payload: FacebookPost[]) {}
}

export type SocialActions = SetFbPosts;