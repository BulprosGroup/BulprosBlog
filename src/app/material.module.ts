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
    MatSelectModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule, MatIconModule, MatFormFieldModule,
        MatInputModule, MatSidenavModule, MatToolbarModule,
        MatListModule, MatCardModule, MatProgressSpinnerModule,
        MatSnackBarModule, MatDialogModule, MatSelectModule,
        MatTableModule
    ],
    exports: [
        MatButtonModule, MatIconModule, MatFormFieldModule,
        MatInputModule, MatSidenavModule, MatToolbarModule,
        MatListModule, MatCardModule, MatProgressSpinnerModule,
        MatSnackBarModule, MatDialogModule, MatSelectModule, 
        MatTableModule
    ]
})
export class MaterialModule {
}