import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { HttpInterceptor } from "@angular/common/http";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private _cookieService: CookieService) {}

  intercept(
    req: import("@angular/common/http").HttpRequest<any>,
    next: import("@angular/common/http").HttpHandler
  ): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    const cloneReq = req.clone({
      setHeaders: {
        "Content-Type": "application/json",
        authorization: "Bearer " + this._cookieService.get("authorization"),
      },
    });
    return next.handle(cloneReq);
  }
}
