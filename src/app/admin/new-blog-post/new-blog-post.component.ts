import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup } from "@angular/forms";

import { BlogStoreService } from "app/shared/blog-store.service";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { BlogPost } from '../../models/blog-post';

@Component({
  selector: 'app-new-blog-post',
  templateUrl: './new-blog-post.component.html',
  styleUrls: ['./new-blog-post.component.css']
})
export class NewBlogPostComponent {
  form: FormGroup;
  content: AbstractControl;
  blogPost: BlogPost;
  showPreview: boolean;
  options: FroalaEditorModule;

  constructor(private fb: FormBuilder, private blogStore: BlogStoreService) {
    this.showPreview = false;

    this.form = fb.group({
      'content': ['', Validators.required]
    });

    this.content = this.form.controls['content'];
    this.options = this.getFroalaOptions();
  }

  onSubmit($event) {
    this.blogPost = this.form.value;
    this.blogPost.datePublished = this.blogPost.datePublished || new Date();
    
    this.blogStore.createBlogPost(this.blogPost);
  }

  previewContent() {
    this.showPreview = !this.showPreview;
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
      height: 500
    };
  }
}
