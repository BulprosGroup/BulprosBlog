import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { BlogPostComponent } from "./blog-post/blog-post.component";
import { BlogPostCardComponent } from "./blog-post-card/blog-post-card.component";

import { SharedModule } from "../shared/shared.module";

import { BlogStoreService } from "./blog-store.service";
import { BlogRoutingModule } from "./blog-routing.module";
import { blogPostsReducer } from './blog.reducer';

@NgModule({
    declarations: [BlogPostComponent, BlogPostCardComponent],
    imports: [
        SharedModule,
        BlogRoutingModule,
        StoreModule.forFeature('blogPosts', blogPostsReducer)
    ],
    exports: [BlogPostCardComponent],
    providers: [BlogStoreService]
})
export class BlogModule {}