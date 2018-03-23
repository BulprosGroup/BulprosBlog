import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { AuthService } from './auth.service';

import { Observable } from 'rxjs/Observable';

import { UserInfo } from '../shared/user-info';
import { BlogPost } from "../models/blog-post";

@Injectable()
export class BlogStoreService {
  private blogPostsCollection: AngularFirestoreCollection<BlogPost>;
  blogPosts: Observable<BlogPost[]>;
  userInfo: UserInfo;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.blogPostsCollection = afs.collection<BlogPost>("BlogPosts");
    this.blogPosts = this.blogPostsCollection.valueChanges();
    this.auth.currentUser().subscribe(user => this.userInfo = user);
  }

  createBlogPost(blogPost: BlogPost) {
    blogPost.datePublished = new Date();
    blogPost.authorName = this.userInfo.displayName;

    this.blogPostsCollection
      .add(blogPost)
      .then(resp => {
        // TODO: Propper success handling
      },
        err => {
          // TODO: propper error handling
          console.log(err);
        });
  }

  getBlogPosts(): Observable<BlogPost[]> {
    return this.blogPosts;
  }

  getBlogPostById(id: string) {
    return this.blogPostsCollection.doc(id);
  }
}
