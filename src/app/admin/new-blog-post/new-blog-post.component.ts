import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup, FormControl } from "@angular/forms";

import { BlogStoreService } from "app/shared/blog-store.service";
import { AuthService } from "app/shared/auth.service";
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
  title: AbstractControl;
  description: AbstractControl;
  blogPost: BlogPost;
  showPreview: boolean;
  options: FroalaEditorModule;

  constructor(private fb: FormBuilder, private blogStore: BlogStoreService, private auth: AuthService) {
    this.showPreview = false;

    this.form = fb.group({
      'title': ['', Validators.required],
      'content': ['', Validators.required],
      'description': ['', Validators.required]
    });

    this.content = this.form.controls['content'];
    this.title = this.form.controls['title'];
    this.description = this.form.controls['description'];
    this.options = this.getFroalaOptions();
  }

  onSubmit($event) {
    if (this.form.valid) {
      this.blogPost = this.form.value;
      this.blogStore.createBlogPost(this.blogPost);
    }
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
      heightMin: 500,
      heightMax: 900,
    };
  }
}
