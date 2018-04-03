import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { BlogPost } from '../blog/blog-post';
import { BlogStoreService } from '../blog/blog-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  private blogPostSubscription: Subscription;
  blogPosts: BlogPost[];

  constructor(private blogStore: BlogStoreService) { }

  ngOnInit() {
    this.blogPostSubscription = this.blogStore.blogPostsChanged
      .subscribe(posts => this.blogPosts = posts);
    this.blogStore.fetchBlogPosts();
  }

  ngOnDestroy() {
    this.blogPostSubscription.unsubscribe();
  }
}
