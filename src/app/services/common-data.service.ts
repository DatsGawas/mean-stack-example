import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CommonDataService {
  private authStatusListener = new Subject<boolean>();

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  setAuthStatusListener(status: boolean) {
    this.authStatusListener.next(status);
  }

  constructor() {}
}
