import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogStoreService } from '../shared/blog-store.service';
import { BlogPost } from '../models/blog-post';
import { Subscription } from 'rxjs';

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

  }
}
