import { Component, OnInit } from '@angular/core';

import { BlogStoreService } from '../../shared/blog-store.service';
import { BlogPost } from '../../models/blog-post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  blogPosts: BlogPost[];

  constructor(private blogService: BlogStoreService) {
  }

  ngOnInit() {
    this.blogService.getBlogPosts().subscribe(posts => this.blogPosts = posts);
  }

}
