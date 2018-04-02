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
import { AuthService } from "./shared/auth.service";
import { BlogStoreService } from "./shared/blog-store.service";
import { LoginUserComponent } from "./auth/login-user/login-user.component";
import { DisplayUserComponent } from "./auth/display-user/display-user.component";
import { RegisterUserComponent } from "./auth/register-user/register-user.component";
import { NewBlogPostComponent } from "./admin/new-blog-post/new-blog-post.component";

import { ResetPasswordComponent } from "./auth/reset-password/reset-password.component";
import { RegisterPageComponent } from "./pages/register-page.component";
import { LoginPageComponent } from "./pages/login-page.component";
import { LoggedInGuard } from "./shared/logged-in-guard";
import { DashboardPageComponent } from './admin/dashboard/dashboard-page.component';

import { AppRoutingModule } from "./app-routing.module";
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HomePageComponent } from './home/home.component';
import { BlogPostCardComponent } from './blog-post-card/blog-post-card.component';
import { UIService } from "./shared/ui.service";
import { DeleteDialogComponent } from "./shared/delete-dialog/delete-dialog.component";
import { SettingsService } from "./shared/settings.service";

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
        NewBlogPostComponent,
        HeaderComponent,
        SidenavListComponent,
        BlogPostCardComponent,
        DeleteDialogComponent
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
    providers: [AuthService, BlogStoreService, SettingsService, LoggedInGuard, UIService],
    entryComponents: [DeleteDialogComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
