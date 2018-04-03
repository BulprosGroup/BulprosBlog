import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "angularfire2/auth";

import { AuthRoutingModule } from "./auth-routing.module";
import { AuthService } from "./auth.service";

import { LoginUserComponent } from "./login-user/login-user.component";
import { RegisterUserComponent } from "./register-user/register-user.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegisterPageComponent } from "./register-user-page/register-page.component";

import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        LoginUserComponent,
        RegisterUserComponent,
        ResetPasswordComponent,
        RegisterPageComponent,
        LoginPageComponent,
      ],
      imports: [
        SharedModule,
        AngularFireAuthModule,
        AuthRoutingModule
      ],
      providers: [AuthService]
})
export class AuthModule {

}