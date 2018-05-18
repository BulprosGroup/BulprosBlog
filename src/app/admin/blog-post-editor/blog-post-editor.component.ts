import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup, FormControl } from "@angular/forms";
import { Observable ,  Subscription ,  BehaviorSubject } from "rxjs";

import { AuthService } from "app/auth/auth.service";

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { SettingsService } from '../../shared/settings.service';
import { UserInfo } from 'app/auth/user-info';
import { BlogPost } from '../../blog/blog-post';
import { BlogStoreService } from '../../blog/blog-store.service';
import { UIService } from '../../shared/ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-post-editor',
  templateUrl: './blog-post-editor.component.html',
  styleUrls: ['./blog-post-editor.component.css']
})
export class BlogPostEditorComponent implements OnInit, OnDestroy {
  @Input() set postData(post: BlogPost) {
    this.form.patchValue(post);
    if (post) {
      this.blogPost = post;
    }
  };

  form: FormGroup;
  content: AbstractControl;
  title: AbstractControl;
  description: AbstractControl;
  category: AbstractControl;

  categories: string[];
  categoriesSubscription: Subscription;

  blogPost: BlogPost = new BlogPost();
  userInfo: UserInfo;
  showPreview: boolean;

  options: FroalaEditorModule;


  constructor(
    private fb: FormBuilder,
    private blogStore: BlogStoreService,
    private auth: AuthService,
    private settings: SettingsService,
    private ui: UIService,
    private router: Router
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
      if (this.blogPost.id) {
        this.blogStore.updateBlogPost(this.blogPost)
          .then((resp) => {
            this.router.navigate(['/dashboard']);
            this.ui.showSnackbar(`'${this.blogPost.title}' was updated successfully.`, null, { duration: 3000 });
          })
          .catch((err) => {
            this.ui.showSnackbar(`'${this.blogPost.title}' was NOT updated.`, null, { duration: 3000 });
          });
      } else {
        this.blogStore.createBlogPost(this.blogPost, this.userInfo)
          .then((resp) => {
            this.router.navigate(['/dashboard']);
            this.ui.showSnackbar(`'${this.blogPost.title}' was saved successfully.`, null, { duration: 3000 });
          })
          .catch((err) => {
            this.ui.showSnackbar(`'${this.blogPost.title}' was NOT saved.`, null, { duration: 3000 });
          });
      }
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
