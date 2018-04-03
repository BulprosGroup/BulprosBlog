import { NgModule } from '@angular/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { DashboardPageComponent } from './dashboard/dashboard-page.component';
import { NewBlogPostComponent } from './new-blog-post/new-blog-post.component';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { SettingsService } from '../shared/settings.service';
import { BlogStoreService } from '../blog/blog-store.service';

@NgModule({
  declarations: [
    DashboardPageComponent,
    NewBlogPostComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [BlogStoreService, SettingsService],
  
})
export class AdminModule { }
