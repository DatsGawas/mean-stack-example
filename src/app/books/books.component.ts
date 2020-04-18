import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError, retry, map } from "rxjs/internal/operators";
import { Observable, throwError } from "rxjs";
import { ResponseI } from "../models/response";
import { CommonDataService } from "../services/common-data.service";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"],
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  isLoading = false;

  constructor(
    private _httpClient: HttpClient,
    public _commonDataService: CommonDataService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this._httpClient
      .get<any>("http://localhost:3000/api/book/getBooks")
      .pipe(
        retry(3),
        catchError(<never>this.handleError),
        map((bookData) => {
          return bookData.data.map((book) => {
            return {
              id: book._id,
              title: book.title,
              subtitle: book.subtitle,
              author: book.author,
              published: book.published,
              publisher: book.publisher,
              description: book.description,
              pages: book.pages,
              website: book.website,
              like: false,
            };
          });
        })
      )
      .subscribe((bookData: any) => {
        this.isLoading = false;
        this.books = [...bookData];
      });
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    this.isLoading = false;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  likeClickHandle(book: any) {
    book.like = !book.like;
    const reqBody = {
      bookId: book.id,
      like: book.like ? 1 : 0,
    };
    this._httpClient
      .post("http://localhost:3000/api/book/update-review", reqBody)
      .subscribe((res: ResponseI) => {
        console.log(res);
      });
  }
}
