import { Injectable } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

import { BlogPost } from "../models/blog-post";

@Injectable()
export class BlogStoreService {
  itemRef: AngularFireObject<any>;
  item: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.itemRef = db.object('item');
    this.item = this.itemRef.valueChanges();
  }

  createBlogPost(blogPost: BlogPost) {
    this.itemRef.set(blogPost);
  }

}
