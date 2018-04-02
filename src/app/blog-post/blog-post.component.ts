import { Component, OnInit } from '@angular/core';
import { BlogStoreService } from '../shared/blog-store.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BlogPost } from '../models/blog-post';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  blogPost = new BlogPost();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogPostService: BlogStoreService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.blogPostService.getBlogPostById(id).subscribe(
      (post: BlogPost) => this.blogPost = post);
  }

}
