import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ResponseI } from "../models/response";
import { CommonDataService } from "../services/common-data.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignUpComponent implements OnInit {
  isLoading: boolean = false;
  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
    private _commonDataService: CommonDataService
  ) {}

  ngOnInit() {}
  onSignup(signupForm: NgForm) {
    if (signupForm.invalid) {
      return;
    }
    const reqObj = {
      name: signupForm.value.name,
      email: signupForm.value.email,
      password: signupForm.value.password,
    };
    this._httpClient
      .post("http://localhost:3000/api/user/signup", reqObj)
      .subscribe((response: ResponseI) => {
        this._commonDataService.openSuccessSnackBar(response.message);
        setTimeout(() => {
          this._router.navigate(["/"]);
        }, 1000);
      });
  }
}
