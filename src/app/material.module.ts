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
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    ErrorStateMatcher,
    ShowOnDirtyErrorStateMatcher
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule, MatIconModule, MatFormFieldModule,
        MatInputModule, MatSidenavModule, MatToolbarModule,
        MatListModule, MatCardModule, MatProgressSpinnerModule,
        MatSnackBarModule, MatDialogModule, MatSelectModule,
        MatTableModule, MatPaginatorModule, MatSortModule
    ],
    exports: [
        MatButtonModule, MatIconModule, MatFormFieldModule,
        MatInputModule, MatSidenavModule, MatToolbarModule,
        MatListModule, MatCardModule, MatProgressSpinnerModule,
        MatSnackBarModule, MatDialogModule, MatSelectModule,
        MatTableModule, MatPaginatorModule, MatSortModule
    ],
    providers: [
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
    ]
})
export class MaterialModule {
}