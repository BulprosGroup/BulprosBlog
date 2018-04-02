import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatSpinner,
    MatProgressSpinnerModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule, MatIconModule, MatFormFieldModule,
        MatInputModule, MatSidenavModule, MatToolbarModule,
        MatListModule, MatCardModule, MatProgressSpinnerModule,
        MatTableModule
    ],
    exports: [
        MatButtonModule, MatIconModule, MatFormFieldModule,
        MatInputModule, MatSidenavModule, MatToolbarModule,
        MatListModule, MatCardModule, MatProgressSpinnerModule,
        MatTableModule
    ]
})
export class MaterialModule {
}