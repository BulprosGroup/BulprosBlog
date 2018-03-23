import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from 'app/models/blog-post';

@Component({
  selector: 'app-blog-post-card',
  templateUrl: './blog-post-card.component.html',
  styleUrls: ['./blog-post-card.component.css']
})
export class BlogPostCardComponent implements OnInit {
  @Input() blogPost: BlogPost;
  
  constructor() { }

  ngOnInit() {
  }

}
