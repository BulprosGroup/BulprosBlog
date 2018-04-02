import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { UserInfo } from '../shared/user-info';
import { BlogPost } from '../models/blog-post';
import { Subject } from 'rxjs';

@Injectable()
export class BlogStoreService {
  blogPostsChanged = new Subject<BlogPost[]>();
  private blogPosts: BlogPost[] = [];
  private userInfo: UserInfo;

  constructor(private afs: AngularFirestore) { }

  createBlogPost(blogPost: BlogPost): Promise<any> {
    blogPost.datePublished = new Date();
    return this.afs.collection('BlogPosts').add(blogPost);
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
    return this.afs.collection('BlogPosts').doc(id);
  }

  updateBlogPost(blogPost: BlogPost) {
    return this.afs.collection('BlogPosts')
      .doc(blogPost.id)
      .update(blogPost);
  }

  deleteBlogPost(id: string) {
    return this.afs.collection('BlogPosts')
                .doc(id)
                .delete();
  }
}
