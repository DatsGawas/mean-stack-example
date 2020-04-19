import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Book } from "../models/book";

@Component({
  selector: "app-add-book",
  templateUrl: "./add-book.component.html",
  styleUrls: ["./add-book.component.css"],
})
export class AddBookComponent implements OnInit {
  book: Book;
  bookForm: FormGroup;
  imagePreview: string;
  constructor(private _httpClient: HttpClient) {
    this.book = new Book();
  }

  ngOnInit() {
    this.bookForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      subtitle: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      author: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      published: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      publisher: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      description: new FormControl(null),
      pages: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      website: new FormControl(null),
      image: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
}

// asyncValidators: [mimeType],
