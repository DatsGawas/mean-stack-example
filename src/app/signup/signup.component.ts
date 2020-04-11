import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignUpComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private _httpClient: HttpClient) {}

  ngOnInit() {}
  onSignup(signupForm: NgForm) {
    if (signupForm.invalid) {
      return;
    }
    const reqObj = {
      email: signupForm.value.email,
      password: signupForm.value.password,
    };
    this._httpClient
      .post("http://localhost:3000/api/user/signup", reqObj)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
