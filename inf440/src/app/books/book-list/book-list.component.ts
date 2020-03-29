import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { Book } from 'src/app/shared/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  objectKeys = Object.keys;
  constructor(public service: BookService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(book: Book) {
    this.service.formData = Object.assign({}, book);
  }
}
