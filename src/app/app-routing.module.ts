import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { BooksComponent } from "./books/books.component";
import { AddBookComponent } from "./add-book/add-book.component";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./signup/signup.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignUpComponent,
  },
  {
    path: "books",
    component: BooksComponent,
  },
  {
    path: "add-book",
    component: AddBookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
