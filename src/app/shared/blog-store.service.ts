import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { AuthService } from './auth.service';

import { Observable } from 'rxjs/Observable';

import { UserInfo } from '../shared/user-info';
import { BlogPost } from '../models/blog-post';
import { Subject } from 'rxjs';

@Injectable()
export class BlogStoreService {
  blogPostsChanged = new Subject<BlogPost[]>();
  private blogPosts: BlogPost[] = [];
  private userInfo: UserInfo;

  constructor(private afs: AngularFirestore) { }

  createBlogPost(blogPost: BlogPost) {
    blogPost.datePublished = new Date();
    blogPost.authorName = this.userInfo.displayName;

    // this.blogPostsCollection
    //   .add(blogPost)
    //   .then(resp => {
    //     // TODO: Propper success handling
    //   },
    //     err => {
    //       // TODO: propper error handling
    //       console.log(err);
    //     });
  }

  fetchBlogPosts() {
    this.afs.collection('BlogPosts')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          };
        });
      })
      .subscribe((posts: any) => {
        this.blogPosts = posts as BlogPost[];
        this.blogPostsChanged.next([...this.blogPosts]);
      });
  }

  getBlogPostById(id: string) {
    // return this.blogPostsCollection.doc(id);
  }
}
