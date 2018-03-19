import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";

import { firebaseConfig } from "environments/firebaseConfig";
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule  } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthService } from "app/shared/auth.service";
import { BlogStoreService } from "app/shared/blog-store.service";
import { LoginUserComponent } from "app/login-user/login-user.component";
import { DisplayUserComponent } from "app/display-user/display-user.component";
import { RegisterUserComponent } from "app/register-user/register-user.component";
import { NewBlogPostComponent } from "app/admin/new-blog-post/new-blog-post.component";

import { AlertModule } from "ngx-bootstrap";

import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./pages/home-page.component";
import { RegisterPageComponent } from "./pages/register-page.component";
import { AllInOnePageComponent } from "./pages/all-in-one-page.component";
import { LoginPageComponent } from "./pages/login-page.component";
import { LoggedInGuard } from "app/shared/logged-in-guard";
import { DashboardPageComponent } from './admin/dashboard/dashboard-page.component';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

const routes: Routes = [
    { path: 'register', component: RegisterPageComponent },
    { path: 'all-in-one', component: AllInOnePageComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'dashboard', component: DashboardPageComponent, canActivate: [LoggedInGuard] },
    { path: 'new-blog-post', component: NewBlogPostComponent, canActivate: [LoggedInGuard] },
    { path: '', component: HomePageComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        DisplayUserComponent,
        LoginUserComponent,
        RegisterUserComponent,
        ResetPasswordComponent,
        HomePageComponent,
        RegisterPageComponent,
        AllInOnePageComponent,
        LoginPageComponent,
        DashboardPageComponent,
        NewBlogPostComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AlertModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig, "BulprosBlog"),
        AngularFirestoreModule,
        AngularFireAuthModule,
        RouterModule.forRoot(routes),
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot()
    ],
    providers: [AuthService, BlogStoreService, LoggedInGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
