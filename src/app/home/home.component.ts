import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { BlogPost } from '../blog/blog-post';
import { BlogStoreService } from '../blog/blog-store.service';

import * as fromBlogPost from '../blog/blog.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomePageComponent implements OnInit {
  blogPosts$: Observable<BlogPost[]>;

  constructor(
    private blogStore: BlogStoreService,
    private store: Store<fromBlogPost.State>
  ) { }

  ngOnInit() {
    this.blogStore.fetchBlogPosts();
    this.blogPosts$ = this.store.select(fromBlogPost.getAvailableBlogPosts);    
  }
}
