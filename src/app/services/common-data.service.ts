import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MatSnackBarConfig, MatSnackBar } from "@angular/material/snack-bar";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class CommonDataService {
  private authStatusListener = new Subject<boolean>();
  private userDetailsListener: User;

  getUserDetailsListener() {
    return this.userDetailsListener;
  }

  setUserDetailsListener(user: User) {
    this.userDetailsListener = user;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  setAuthStatusListener(status: boolean) {
    this.authStatusListener.next(status);
  }

  constructor(public snackBar: MatSnackBar) {
    this.userDetailsListener = new User();
  }

  openSuccessSnackBar(msg) {
    const config = new MatSnackBarConfig();
    config.duration = 1000;
    (config.panelClass = ["success-notification"]),
      (config.horizontalPosition = "right"),
      (config.verticalPosition = "bottom"),
      this.snackBar.open(msg, "", config);
  }
}
