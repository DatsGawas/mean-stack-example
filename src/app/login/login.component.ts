import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {
  MatSnackBarModule,
  MatSnackBar,
  MatSnackBarConfig,
} from "@angular/material/snack-bar";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  constructor(
    private _router: Router,
    public snackBar: MatSnackBar,
    private _httpClient: HttpClient
  ) {}

  ngOnInit() {}
  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    const reqObj = {
      email: loginForm.value.email,
      password: loginForm.value.password,
    };
    this._httpClient
      .post("http://localhost:3000/api/user/login", reqObj)
      .subscribe((response: any) => {
        let config = new MatSnackBarConfig();
        config.duration = 1000;
        (config.panelClass = ["success-notification"]),
          (config.horizontalPosition = "right"),
          (config.verticalPosition = "bottom"),
          this.snackBar.open(response.message, "", config);
        loginForm.reset();
        setTimeout(() => {
          this._router.navigate(["home"]);
        }, config.duration);
      });
  }

  signUpNavigationHandle() {
    this._router.navigate(["signup"]);
  }
}
