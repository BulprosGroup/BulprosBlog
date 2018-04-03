import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BlogPostComponent } from "./blog-post/blog-post.component";

const routes: Routes = [
    { path: 'blog-post/:id', component: BlogPostComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class BlogRoutingModule { }