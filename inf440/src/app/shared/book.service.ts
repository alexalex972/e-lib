import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  formData: Book;
  list: Book[];
  readonly rootURL = "http://localhost:51377/api"
  constructor(private http: HttpClient) { }

  postBook(formData: Book) {
    return this.http.post(this.rootURL + '/Books', formData);
  }

  refreshList() {
    this.http.get(this.rootURL + '/Books')
      .toPromise().then(res => this.list = res as Book[]);
  }

  deleteBook(id: number) {
    return this.http.delete(this.rootURL + '/Books/' + id);
  }

  putEmployee(formData: Book) {
    return this.http.put(this.rootURL + '/Books/' + formData.BookID, formData);
  }

  search(terms: Observable<string>) {
    return terms.pipe(debounceTime(800),
    distinctUntilChanged(),
    switchMap(term => this.searchEntries(term)))
  }

  searchEntries(searchTerm){
    return this.http.get(this.rootURL + '/search/' + searchTerm)
  }

}
