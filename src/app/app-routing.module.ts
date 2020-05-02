import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { BooksComponent } from "./books/books.component";
import { AddBookComponent } from "./add-book/add-book.component";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./signup/signup.component";
import { AdminGuard } from "./guard/admin.guard";
import { AppBasicGuard } from "./guard/appBasic.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AppBasicGuard],
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AppBasicGuard],
  },
  {
    path: "signup",
    component: SignUpComponent,
    canActivate: [AppBasicGuard],
  },
  {
    path: "books",
    component: BooksComponent,
    canActivate: [AppBasicGuard],
  },
  {
    path: "add-book",
    component: AddBookComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
