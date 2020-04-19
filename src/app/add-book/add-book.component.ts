import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Book } from "../models/book";
import { environment } from "src/environments/environment";
import { mimeType } from "./mime-type-validator";
import { CommonDataService } from "../services/common-data.service";
import { ResponseI } from "../models/response";

@Component({
  selector: "app-add-book",
  templateUrl: "./add-book.component.html",
  styleUrls: ["./add-book.component.css"],
})
export class AddBookComponent implements OnInit {
  book: Book;
  bookForm: FormGroup;
  imagePreview: string;
  constructor(
    private _httpClient: HttpClient,
    private _commonDataService: CommonDataService
  ) {
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
        asyncValidators: [mimeType],
      }),
    });
  }

  onImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.bookForm.patchValue({ image: file });
    this.bookForm.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    console.log(file);
    console.log(this.bookForm);
  }

  addBookHandle() {
    if (this.bookForm.invalid) {
      return;
    }
    // const postData = new FormData();
    // postData.append("title", this.book.title);

    // postData.append("subtitle", this.book.subtitle);
    // postData.append("author", this.book.author);

    // postData.append("published", this.book.published);

    // postData.append("publisher", this.book.publisher);
    // postData.append("description", this.book.description);

    // postData.append("pages", this.book.pages);

    // postData.append("website", this.book.website);
    // postData.append("image", this.bookForm.value.image, this.book.title);

    this._httpClient
      .post("http://localhost:3000/api/book/add-book", this.book)
      .subscribe((response: ResponseI) => {
        // this._router.navigate(["/login"]);
        this._commonDataService.openSuccessSnackBar(response.message);

        this.bookForm.reset();
      });
  }
}

// asyncValidators: [mimeType],
