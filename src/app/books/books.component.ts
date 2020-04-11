import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError, retry, map } from "rxjs/internal/operators";
import { Observable, throwError } from "rxjs";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"],
})
export class BooksComponent implements OnInit {
  books: any[] = [];

  constructor(private _httpClient: HttpClient) {}

  ngOnInit(): void {
    this._httpClient
      .get<any>(environment.domain + "assets/data/books.json")
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
            };
          });
        })
      )
      .subscribe((bookData: any) => {
        this.books = [...bookData];
      });
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
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
}
