import { NgModule } from "@angular/core";
import { BlogPostComponent } from "./blog-post/blog-post.component";
import { BlogPostCardComponent } from "./blog-post-card/blog-post-card.component";

import { SharedModule } from "../shared/shared.module";

import { BlogStoreService } from "./blog-store.service";
import { BlogRoutingModule } from "./blog-routing.module";


@NgModule({
    declarations: [BlogPostComponent, BlogPostCardComponent],
    imports: [
        SharedModule,
        BlogRoutingModule
    ],
    exports: [BlogPostCardComponent],
    providers: [BlogStoreService]
})
export class BlogModule {}