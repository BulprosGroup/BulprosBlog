import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import {
    SocialActions,
    SET_FB_POSTS
} from './social.actions';
import { FacebookPost } from './facebook/facebookPost.model';
import * as fromRoot from '../app.reducer';

export interface SocialState {
    fbPosts: FacebookPost[]
}

export interface State extends fromRoot.State {
    social: SocialState
}

const initialState: SocialState = {
    fbPosts: []
};

export function socialReducer(state = initialState, action: SocialActions) {
    switch (action.type) {
        case SET_FB_POSTS:
            return {
                fbPosts: action.payload
            }
        default:
            return state;
    }
}

export const getSocialState = createFeatureSelector<SocialState>('social');
export const getFbPosts = createSelector(getSocialState, (state: SocialState) => state.fbPosts);