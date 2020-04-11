import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {
  MatSnackBarModule,
  MatSnackBar,
  MatSnackBarConfig,
} from "@angular/material/snack-bar";
import { CookieService } from "ngx-cookie-service";
import { CommonDataService } from "../services/common-data.service";

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
    private _httpClient: HttpClient,
    private _cookieService: CookieService,
    private _commonDataService: CommonDataService
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
        this._cookieService.set("authorization", response.token);
        this.openSnackBar(response.message);
        loginForm.reset();
        // update auth status
        this._commonDataService.setAuthStatusListener(true);
        setTimeout(() => {
          this._router.navigate(["/"]);
        }, 1000);
      });
  }

  openSnackBar(msg) {
    const config = new MatSnackBarConfig();
    config.duration = 1000;
    (config.panelClass = ["success-notification"]),
      (config.horizontalPosition = "right"),
      (config.verticalPosition = "bottom"),
      this.snackBar.open(msg, "", config);
  }

  signUpNavigationHandle() {
    this._router.navigate(["signup"]);
  }
}
