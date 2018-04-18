import { Injectable, Inject } from "@angular/core";
import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { UserInfo } from "./user-info";
import { UIService } from "../shared/ui.service";

import { Store } from "@ngrx/store";
import * as fromRoot from "../app.reducer";
import * as Auth from "../auth/auth.actions";

@Injectable()
export class AuthService {
    static UNKNOWN_USER = {
        isAnonymous: true,
        email: null,
        displayName: null,
        providerId: null,
        uid: null
    };

    userInfo = new BehaviorSubject<UserInfo>(AuthService.UNKNOWN_USER);
    private user: firebase.User;

    constructor(
        private angularFireAuth: AngularFireAuth,
        private ui: UIService,
        private store: Store<fromRoot.State>
    ) {
        this.angularFireAuth.authState.subscribe(user => {
            this.user = user;
            let userInfo = new UserInfo();
            if (user != null) {
                userInfo.isAnonymous = user.isAnonymous;
                userInfo.email = user.email;
                userInfo.displayName = user.displayName;
                userInfo.providerId = user.providerId;
                userInfo.photoURL = user.photoURL;
                userInfo.uid = user.uid;
            } else {
                this.user = null;
                userInfo.isAnonymous = true;
            }
            this.userInfo.next(userInfo);
        });
    }

    login(email: string, password: string): Observable<string> {
        let result = new Subject<string>();
        this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                this.ui.showSnackbar("Successful login.", null, {
                    duration: 3000
                });
                result.next("success");
                this.store.dispatch(new Auth.SetAuthenticated());
            })
            .catch(err => {
                this.ui.showSnackbar(err.message, null, {
                    duration: 3000
                });
                result.error(err);
                this.store.dispatch(new Auth.SetUnauthenticated());                
            });
        return result.asObservable();
    }

    currentUser(): Observable<UserInfo> {
        return this.userInfo.asObservable();
    }

    logout(): Observable<string> {
        let result = new Subject<string>();
        this.userInfo.next(AuthService.UNKNOWN_USER);
        this.angularFireAuth.auth.signOut()
            .then(() => {
                this.ui.showSnackbar('Successful logout.', null, {
                    duration: 3000
                });
                result.next("success");
                this.store.dispatch(new Auth.SetUnauthenticated());                
            })
            .catch(err => {
                this.ui.showSnackbar(err.message, null, {
                    duration: 3000
                });
                result.error(err);
                this.store.dispatch(new Auth.SetUnauthenticated());                                
            });
        return result.asObservable();
    }

    updateDisplayName(displayName: string): Observable<string> {
        let result = new Subject<string>();
        this.user.updateProfile({ displayName: displayName, photoURL: null })
            .then(() => { result.next("success") })
            .catch(err => result.error(err));
        return result;
    }

    createUser(email: string, password: string, displayName: string): Observable<string> {
        let result = new Subject<string>();
        this.angularFireAuth.authState.subscribe(user => {
            // console.log("Update: ", user);
            if (user != null) {
                user.updateProfile({ displayName: displayName, photoURL: null });
            }
        });
        this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                //auth.auth.updateProfile({displayName: displayName, photoURL: null});
                this.ui.showSnackbar('User successfully created.', null, {
                    duration: 3000
                });
                result.next("success");
                this.store.dispatch(new Auth.SetAuthenticated());                                
            })
            .catch(err => { 
                this.ui.showSnackbar(err.message, null, {
                    duration: 3000
                });
                result.error(err);
                this.store.dispatch(new Auth.SetUnauthenticated());
            });

        return result.asObservable();
    }

    updateEmail(email: string): Observable<string> {
        let result = new Subject<string>();
        this.user.updateEmail(email)
            .then(() => result.next("success"))
            .catch(err => result.error(err));
        return result.asObservable();
    }

    updatePassword(password: string): Observable<string> {
        let result = new Subject<string>();
        this.user.updatePassword(password)
            .then(a => {
                result.next("success");
            })
            .catch(err => result.error(err));
        return result.asObservable();
    }

    sendPasswordResetEmail(email: string): Observable<string> {
        let result = new Subject<string>();
        this.angularFireAuth.auth.sendPasswordResetEmail(email)
            .then(() => result.next("success"))
            .catch(err => result.error(err));
        return result;
    }
}