import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ExtractLinksPipe } from './extract-links.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,        
        MaterialModule,
        FlexLayoutModule,
        ExtractLinksPipe
    ],
    declarations: [ExtractLinksPipe]
})
export class SharedModule { }