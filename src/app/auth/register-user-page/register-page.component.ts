import {Component} from "@angular/core";
import {Observable} from "rxjs";

import { Store } from "@ngrx/store";
import * as fromRoot from '../../app.reducer';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
    isAuth$: Observable<boolean>;
    constructor(private store: Store<fromRoot.State>) {
        this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    }
}
