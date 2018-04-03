import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { firebaseConfig } from "environments/firebaseConfig";
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule  } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { SharedModule } from "./shared/shared.module";
import { AdminModule } from "./admin/admin-module.module";
import { AuthModule } from "./auth/auth.module";
import { BlogModule } from "./blog/blog.module";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HomePageComponent } from './home/home.component';

import { UIService } from "./shared/ui.service";
import { DeleteDialogComponent } from "./shared/delete-dialog/delete-dialog.component";
import { SettingsService } from "./shared/settings.service";


@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        HeaderComponent,
        SidenavListComponent,
        DeleteDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule,
        AdminModule,
        AuthModule,
        BlogModule,
        AngularFireModule.initializeApp(firebaseConfig, "BulprosBlog"),
        AngularFirestoreModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
