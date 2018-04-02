import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

import { BlogStoreService } from '../../shared/blog-store.service';
import { BlogPost } from '../../models/blog-post';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource();
  displayedColumns = ['title', 'status', 'datePublished', 'dateModified', 'actions'];
  isDataLoaded = false;
  private blogPostsSubscription: Subscription;

  constructor(private blogService: BlogStoreService) {
  }

  ngOnInit() {
    this.blogPostsSubscription = this.blogService.blogPostsChanged
      .subscribe(posts => {
        this.isDataLoaded = posts != null;
        this.dataSource.data = posts
      });
    this.blogService.fetchBlogPosts();
  }

  ngOnDestroy() {
    this.blogPostsSubscription.unsubscribe();
  }

}
