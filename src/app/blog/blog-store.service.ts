import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { BlogPost } from './blog-post';
import { UserInfo } from '../auth/user-info';

import { Store } from '@ngrx/store';

import * as UI from '../shared/ui.actions';
import * as BlogPosts from './blog.actions';
import * as fromBlogPosts from './blog.reducer';

@Injectable()
export class BlogStoreService {
  constructor(
    private afs: AngularFirestore,
    private store: Store<fromBlogPosts.State>) { }

  createBlogPost(blogPost: BlogPost, userInfo: UserInfo) {
    blogPost.datePublished = new Date();
    blogPost.status = blogPost.status || 'published';

    blogPost.authorId = userInfo.uid;
    blogPost.authorName = userInfo.displayName;

    return this.afs.collection('BlogPosts').add(blogPost);
  }

  fetchBlogPosts() {
    this.store.dispatch(new UI.StartLoading()); // triggers the loading event
    
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
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new BlogPosts.SetAvailableBlogPosts(posts));
      });
  }

  getBlogPostById(id: string) {
    return this.afs.collection('BlogPosts').doc(id).valueChanges();
  }

  updateBlogPost(blogPost: BlogPost) {
    blogPost.dateModified = new Date();
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
