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
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule, MatIconModule, MatFormFieldModule,
        MatInputModule, MatSidenavModule, MatToolbarModule,
        MatListModule, MatCardModule, MatProgressSpinnerModule,
        MatSnackBarModule, MatDialogModule,
        MatTableModule
    ],
    exports: [
        MatButtonModule, MatIconModule, MatFormFieldModule,
        MatInputModule, MatSidenavModule, MatToolbarModule,
        MatListModule, MatCardModule, MatProgressSpinnerModule,
        MatSnackBarModule, MatDialogModule,     
        MatTableModule
    ]
})
export class MaterialModule {
}