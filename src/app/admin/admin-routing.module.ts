import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPageComponent } from './dashboard/dashboard-page.component';
import { NewBlogPostComponent } from './new-blog-post/new-blog-post.component';

import { LoggedInGuard } from '../auth/logged-in-guard';

const routes: Routes = [
    { path: 'dashboard', component: DashboardPageComponent, canActivate: [LoggedInGuard] },
    { path: 'new-blog-post', component: NewBlogPostComponent, canActivate: [LoggedInGuard] }
  ];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [LoggedInGuard]
})
export class AdminRoutingModule {}
