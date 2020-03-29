import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  formData : Book;
  list : Book[];
  readonly rootURL ="http://localhost:51377/api"
  constructor(private http : HttpClient) { }

  postBook(formData : Book){
    return this.http.post(this.rootURL+'/Books',formData);
   }

   refreshList(){
    this.http.get(this.rootURL+'/Books')
    .toPromise().then(res => this.list = res as Book[]);
  }

}
