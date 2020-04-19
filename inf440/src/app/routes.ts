
import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { BooksComponent } from './books/books.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { SearchComponent } from './search/search.component';

export const appRoutes: Routes = [
  { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
  {
    path: 'signup', component: SignUpComponent
  },
  {
    path: 'login', component: SignInComponent
  },
  {
    path: 'edit-book', component: EditBookComponent
  },
  {
    path: 'search', component: SearchComponent
  },
  {
    path: 'welcome', component: WelcomeComponent,
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },

];
