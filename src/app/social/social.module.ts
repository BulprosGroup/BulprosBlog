import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';

import { MaterialModule } from '../material.module';

import { SocialComponent } from './social.component';
import { FacebookComponent } from './facebook/facebook.component';
import { SocialService } from './social.service';
import { socialReducer } from './social.reducer';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        HttpClientModule,
        SharedModule,
        StoreModule.forFeature('social', socialReducer)
    ],
    exports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        SocialComponent
    ],
    declarations: [
        SocialComponent,
        FacebookComponent
    ],
    providers: [SocialService]
})
export class SocialModule { }