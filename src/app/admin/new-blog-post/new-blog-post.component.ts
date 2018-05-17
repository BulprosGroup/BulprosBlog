import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-blog-post',
  templateUrl: './new-blog-post.component.html',
  styleUrls: ['./new-blog-post.component.css']
})
export class NewBlogPostComponent implements OnInit {
   constructor(
    private router: Router
  ) {}
    

  ngOnInit() {
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
