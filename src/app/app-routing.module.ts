import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginPageComponent } from './pages/login-page.component';
import { DashboardPageComponent } from './admin/dashboard/dashboard-page.component';
import { NewBlogPostComponent } from './admin/new-blog-post/new-blog-post.component';
import { HomePageComponent } from './home/home.component';

import { LoggedInGuard } from './shared/logged-in-guard';

const routes: Routes = [
  { path: 'register', component: RegisterPageComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'dashboard', component: DashboardPageComponent, canActivate: [LoggedInGuard] },
  { path: 'new-blog-post', component: NewBlogPostComponent, canActivate: [LoggedInGuard] },
  { path: '', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoggedInGuard]
})
export class AppRoutingModule { }
