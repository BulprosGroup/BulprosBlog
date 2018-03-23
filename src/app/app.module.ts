import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Routes, RouterModule } from "@angular/router";

import { firebaseConfig } from "environments/firebaseConfig";
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule  } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { AppComponent } from "./app.component";
import { MaterialModule } from './material.module';
import { AuthService } from "app/shared/auth.service";
import { BlogStoreService } from "app/shared/blog-store.service";
import { LoginUserComponent } from "app/login-user/login-user.component";
import { DisplayUserComponent } from "app/display-user/display-user.component";
import { RegisterUserComponent } from "app/register-user/register-user.component";
import { NewBlogPostComponent } from "app/admin/new-blog-post/new-blog-post.component";

import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { HomePageComponent } from "./pages/home-page.component";
import { RegisterPageComponent } from "./pages/register-page.component";
import { LoginPageComponent } from "./pages/login-page.component";
import { LoggedInGuard } from "app/shared/logged-in-guard";
import { DashboardPageComponent } from './admin/dashboard/dashboard-page.component';

import { AppRoutingModule } from "./app-routing.module";

@NgModule({
    declarations: [
        AppComponent,
        DisplayUserComponent,
        LoginUserComponent,
        RegisterUserComponent,
        ResetPasswordComponent,
        HomePageComponent,
        RegisterPageComponent,
        LoginPageComponent,
        DashboardPageComponent,
        NewBlogPostComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MaterialModule,
        AppRoutingModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(firebaseConfig, "BulprosBlog"),
        AngularFirestoreModule,
        AngularFireAuthModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot()
    ],
    providers: [AuthService, BlogStoreService, LoggedInGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
