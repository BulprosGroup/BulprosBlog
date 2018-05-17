import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

import * as fromBlogPosts from '../../blog/blog.reducer';

import { UIService } from '../../shared/ui.service';
import { BlogStoreService } from '../../blog/blog-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit,  AfterViewInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['title', 'category', 'status', 'datePublished', 'dateModified', 'actions'];
  isDataLoaded = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private blogService: BlogStoreService,
    private ui: UIService,
    private store: Store<fromBlogPosts.State>,
    private router: Router
  ) {  }

  ngOnInit() {
      this.store.select(fromBlogPosts.getAvailableBlogPosts).subscribe(posts => {
        this.isDataLoaded = posts != null;        
        this.dataSource.data = posts
      });
    this.blogService.fetchBlogPosts();
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

  navigateToUpdate(blogPost) {
      this.router.navigate(['/update-blog-post', blogPost.id]);

    // this.blogService.updateBlogPost(blogPost)
    //   .then((resp) => {
    //     this.ui.showSnackbar(`'${blogPost.title}' was updated successfully.`, null, { duration: 3000 });
    //   })
    //   .catch((err) => {
    //     this.ui.showSnackbar(`'${blogPost.title}' was NOT updated.`, null, { duration: 3000 });
    //   });;
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
    this.dataSource.filter = filterTerm.trim().toLowerCase();
  }
}
