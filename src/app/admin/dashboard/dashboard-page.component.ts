import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

import { UIService } from '../../shared/ui.service';
import { BlogStoreService } from '../../blog/blog-store.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy, AfterViewInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['title', 'category', 'status', 'datePublished', 'dateModified', 'actions'];
  isDataLoaded = false;
  private blogPostsSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

  filterByTitle(filterTerm) {
    console.log(filterTerm);
    this.dataSource.filter = filterTerm.trim().toLowerCase();
  }
}
