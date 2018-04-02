import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

import { BlogStoreService } from '../../shared/blog-store.service';
import { BlogPost } from '../../models/blog-post';
import { UIService } from '../../shared/ui.service';

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

  constructor(private blogService: BlogStoreService, private ui: UIService) {
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

  publish(blogPost) {
    if (blogPost.status == 'draft') {
      blogPost.status = 'published';
      this.blogService.updateBlogPost(blogPost)
        .then((resp) => {
          this.ui.showSnackbar(`'${blogPost.title}' was published successfully.`, null, { duration: 3000 });
        })
        .catch((err) => {
          this.ui.showSnackbar(`'${blogPost.title}' was NOT published.`, null, { duration: 3000 });
        });
    } else {
      this.ui.showSnackbar(`Only Blog Posts with status 'draft' can be published.`, null, { duration: 3000 });
    }
  }

  edit(blogPost) {
    this.blogService.updateBlogPost(blogPost)
      .then((resp) => {
        this.ui.showSnackbar(`'${blogPost.title}' was updated successfully.`, null, { duration: 3000 });
      })
      .catch((err) => {
        this.ui.showSnackbar(`'${blogPost.title}' was NOT updated.`, null, { duration: 3000 });
      });;
  }

  delete(blogPost) {
    this.ui.openDeleteBlogPostDialog(blogPost).afterClosed().subscribe(shouldDelete => {
      if (shouldDelete) {
        this.blogService.deleteBlogPost(blogPost.id)
          .then((resp) => {
            this.ui.showSnackbar(`'${blogPost.title}' was deleted successfully.`, null, { duration: 3000 });
          })
          .catch((err) => {
            this.ui.showSnackbar(`'${blogPost.title}' was NOT deleted.`, null, { duration: 3000 });
          });
      } 
    });
  }

}
