import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

import { BlogPost } from "../models/blog-post";

@Injectable()
export class BlogStoreService {
  private blogPostsCollection: AngularFirestoreCollection<BlogPost>;
  blogPosts: Observable<BlogPost[]>;

  constructor(private afs: AngularFirestore) {
    this.blogPostsCollection = afs.collection<BlogPost>("BlogPosts");
    this.blogPosts = this.blogPostsCollection.valueChanges();
  }

  createBlogPost(blogPost: BlogPost) {
    this.blogPostsCollection.add(blogPost);
  }
}
