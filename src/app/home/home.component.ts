import { Component, OnInit } from '@angular/core';
import { BlogStoreService } from '../shared/blog-store.service';
import { BlogPost } from '../models/blog-post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomePageComponent implements OnInit {
  blogPosts: BlogPost[];
  
  constructor(private blogStore: BlogStoreService) { }

  ngOnInit() {
    this.blogStore.getBlogPosts().subscribe(posts => this.blogPosts = posts);
  }
}
