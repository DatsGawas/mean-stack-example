import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { CommonDataService } from "../services/common-data.service";
import { ResponseI } from "../models/response";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  constructor(
    private _router: Router,
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
      .subscribe((response: ResponseI) => {
        this._cookieService.set("authorization", response.data.token);
        this._commonDataService.openSuccessSnackBar(response.message);
        // update auth status
        this._commonDataService.setUserDetailsListener(response.data.user);
        this._cookieService.set("userInfo", JSON.stringify(response.data.user));
        this._commonDataService.setAuthStatusListener(true);
        setTimeout(() => {
          loginForm.reset();
          this._router.navigate(["/"]);
        }, 1000);
      });
  }

  signUpNavigationHandle() {
    this._router.navigate(["signup"]);
  }
}
