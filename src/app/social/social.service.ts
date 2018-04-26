import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as Social from './social.actions';
import * as fromSocial from './social.reducer';
import { FacebookPost } from './facebook/facebookPost.model';

const FB_ACCESS_TOKEN = 'EAACEdEose0cBAJqgNJaUtZAhNkDEffgTbebAoQV5ZA6S0Pxtby4FJZCsPbooAjhgqUGx0g5lGcVYlngm2GBQOymqNl6DAoPEdVVPeY5tHomdO9OWMQ70Jv0QcRJZCnSUNemxxSkBuUEpCRL17JgFFAikhd0H8w5d4nGdB74OOZBACfFTfE1Bxa2b2HCS4dmyJyedHH1I5usAns3TdCTkN';
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
