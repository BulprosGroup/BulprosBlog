import { Component, EventEmitter, Output } from "@angular/core";
import { AuthService } from "app/auth/auth.service";
import { FormBuilder, Validators, AbstractControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login-user',
    templateUrl: './login-user.component.html',
    styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
    form: FormGroup;
    email: AbstractControl;
    password: AbstractControl;
    @Output() onSuccess = new EventEmitter();
    @Output() onError = new EventEmitter();

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.form = fb.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required]
        });
        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
    }

    login() {
        if (this.form.valid) {
            this.authService.login(this.email.value, this.password.value)
                .subscribe(
                    () => {
                        this.router.navigate(['/dashboard']);
                        this.onSuccess.emit();
                        this.form.reset();
                    },
                    (err) => this.onError.emit(err)
                );
        }
    }
}