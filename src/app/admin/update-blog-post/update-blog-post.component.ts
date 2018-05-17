import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlogStoreService } from '../../blog/blog-store.service';
import { BlogPost } from '../../blog/blog-post';

@Component({
  selector: 'app-update-blog-post',
  templateUrl: './update-blog-post.component.html',
  styleUrls: ['./update-blog-post.component.css']
})
export class UpdateBlogPostComponent implements OnInit {
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
