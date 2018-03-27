import { Component, OnInit, OnDestroy } from '@angular/core';

import { BlogStoreService } from '../../shared/blog-store.service';
import { BlogPost } from '../../models/blog-post';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  private blogPostsSubscription: Subscription;
  blogPosts: BlogPost[];

  constructor(private blogService: BlogStoreService) {
  }

  ngOnInit() {
    this.blogPostsSubscription = this.blogService.blogPostsChanged
      .subscribe(posts => this.blogPosts = posts);
    this.blogService.fetchBlogPosts();
  }

  ngOnDestroy() {
    this.blogPostsSubscription.unsubscribe();
  }

}
