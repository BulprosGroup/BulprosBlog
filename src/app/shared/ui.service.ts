import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';

import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Injectable()
export class UIService {
    loadingStateChanged = new Subject<boolean>();

    constructor(private snackbar: MatSnackBar, private dialog: MatDialog) {}

    showSnackbar(message, action, options) {
        this.snackbar.open(message, action, {
            duration: options.duration || 3000
        });
    }

    openDeleteBlogPostDialog(data) {
        return this.dialog.open(DeleteDialogComponent, {
            data: {
                blogTitle: data.title
            }
        });
    }
}