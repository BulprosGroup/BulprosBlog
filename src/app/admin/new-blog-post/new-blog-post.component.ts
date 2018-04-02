import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup, FormControl } from "@angular/forms";

import { BlogStoreService } from "app/shared/blog-store.service";
import { AuthService } from "app/shared/auth.service";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { BlogPost } from '../../models/blog-post';
import { SettingsService } from '../../shared/settings.service';
import { Subscription } from 'rxjs';
import { UserInfo } from '../../shared/user-info';

@Component({
  selector: 'app-new-blog-post',
  templateUrl: './new-blog-post.component.html',
  styleUrls: ['./new-blog-post.component.css']
})
export class NewBlogPostComponent implements OnInit, OnDestroy {
  form: FormGroup;
  content: AbstractControl;
  title: AbstractControl;
  description: AbstractControl;
  category: AbstractControl;

  categories: string[];  
  categoriesSubscription: Subscription;

  blogPost: BlogPost;
  userInfo: UserInfo;
  showPreview: boolean;

  options: FroalaEditorModule;

  constructor(
    private fb: FormBuilder, 
    private blogStore: BlogStoreService,
    private auth: AuthService,
    private settings: SettingsService
  ) {
    this.form = fb.group({
      'title': ['', Validators.required],
      'content': ['', Validators.required],
      'description': ['', Validators.required],
      'category': ['', Validators.required]
    });

    this.content = this.form.controls['content'];
    this.title = this.form.controls['title'];
    this.description = this.form.controls['description'];
    this.category = this.form.controls['category'];
  }

  ngOnInit() {
    this.showPreview = false;
    this.options = this.getFroalaOptions();

    this.settings.categoriesChanged.subscribe(
      categories => this.categories = categories);
    this.categoriesSubscription = this.settings.fetchCategories();

    this.auth.currentUser().subscribe(user => this.userInfo = user);
  }

  ngOnDestroy() {
    this.categoriesSubscription.unsubscribe();
  }

  onSubmit($event) {
    if (this.form.valid) {
      this.blogPost = this.form.value;
      this.blogStore.createBlogPost(this.blogPost, this.userInfo);
    }
  }

  previewContent() {
    this.showPreview = !this.showPreview;
  }

  saveDraft() {
    if (this.form.valid) {
      this.blogPost = this.form.value;
      this.blogPost.status = 'draft';

      this.blogStore.createBlogPost(this.blogPost, this.userInfo);
    }
  }

  getFroalaOptions(): FroalaEditorModule {
    return {
      codeBeautifierOptions: {
        end_with_newline: true,
        indent_inner_html: true,
        extra_liners: "['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'ul', 'ol', 'table', 'dl']",
        brace_style: 'expand',
        indent_char: ' ',
        indent_size: 4,
        wrap_line_length: 0
      },
      heightMin: 500,
      heightMax: 900,
    };
  }
}
