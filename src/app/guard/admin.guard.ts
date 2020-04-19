import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { User } from "../models/user";
import { CommonDataService } from "../services/common-data.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(
    private _cookieService: CookieService,
    private _commonDataService: CommonDataService,
    private _router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this._cookieService.check("authorization") &&
      this._cookieService.check("userInfo")
    ) {
      this._commonDataService.setAuthStatusListener(true);
      const userData: User = JSON.parse(this._cookieService.get("userInfo"));
      this._commonDataService.setUserDetailsListener(userData);
      if (userData.role == 1) {
        return true;
      } else {
        this._router.navigate(["/"]);
        return false;
      }
    }
    this._router.navigate(["/"]);
    return false;
  }
}
