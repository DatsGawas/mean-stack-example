import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { CommonDataService } from "../services/common-data.service";
import { CookieService } from "ngx-cookie-service";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class AppBasicGuard implements CanActivate {
  constructor(
    private _cookieService: CookieService,
    private _commonDataService: CommonDataService
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
    }
    return true;
  }
}
