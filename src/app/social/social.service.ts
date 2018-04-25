import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as Social from './social.actions';
import * as fromSocial from './social.reducer';
import { FacebookPost } from './facebook/facebookPost.model';

const FB_ACCESS_TOKEN = 'EAACEdEose0cBAM9Ao7Rd2TeBuz89DctamHe0TREUb2olLwy7avYxbzoqvN0PZB8ZBQgZCjubWyUtesRiw3HoHxVXGZBu4fgzzMMrCcXfPibCvxV6z0GZC25T1DLgRoinzLcYkcyq3n3hGkT6DAJZBeZCKuKoRhKsilXVFxV2JmPgPRbATCgW6anZBCi7TCGZBSacZD';
const VERSION = 'v2.12';
const PAGE_ID = 'Bulpros';
const FIELDS = 'full_picture,id,story,message,created_time';

@Injectable()
export class SocialService {
  constructor(
    private http: HttpClient,
    private store: Store<fromSocial.State>
  ) { }

  fetchFacebookPost() {
    this.http.get(`https://graph.facebook.com/${VERSION}/${PAGE_ID}/feed?access_token=${FB_ACCESS_TOKEN}&fields=${FIELDS}`)
    .subscribe(fbData => {
      this.store.dispatch(new Social.SetFbPosts(fbData['data']));
    });
  }
}
