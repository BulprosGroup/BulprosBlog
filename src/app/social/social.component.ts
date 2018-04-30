import { Component, OnInit } from '@angular/core';
import { SocialService } from './social.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromSocial from './social.reducer';

import { FacebookPost } from './facebook/facebookPost.model';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  fbPosts$: Observable<FacebookPost[]>;

  constructor(
    private social: SocialService,
    private store: Store<fromSocial.State>
  ) { }

  ngOnInit() {
    // this.social.fetchFacebookPost();
    // this.fbPosts$ = this.store.select(fromSocial.getFbPosts);
  }
}
