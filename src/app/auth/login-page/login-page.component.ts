import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
    isAuth$: Observable<boolean>;

    constructor(private store: Store<fromRoot.State>, private router: Router) {
        this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    }

    navigateToResetPassword($event) {
        this.router.navigate(['reset-password']);
    }

    navigateToHome() {
        this.router.navigate(['/']);
    }
}
