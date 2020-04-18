import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { CommonDataService } from "./services/common-data.service";
import { Subscription } from "rxjs";
import { User } from "./models/user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  isUserAuthenticated = false;
  authStatusListenerSub: Subscription;
  constructor(
    private _router: Router,
    public _commonDataService: CommonDataService,
    private _cookieService: CookieService
  ) {}
  ngOnDestroy(): void {
    if (this.authStatusListenerSub) {
      this.authStatusListenerSub.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.authStatusListenerSub = this._commonDataService
      .getAuthStatusListener()
      .subscribe((status: boolean) => {
        this.isUserAuthenticated = status;
      });
  }
  handleNavigation(path: string) {
    this._router.navigate([path]);
  }

  logout() {
    this._cookieService.delete("authorization");
    this._commonDataService.setAuthStatusListener(false);
    this._commonDataService.setUserDetailsListener(new User());
    this._router.navigate(["/"]);
  }
}
