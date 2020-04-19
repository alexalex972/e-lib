import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../shared/book.model';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  results
  searchTerm$ = new Subject<string>();
  constructor(private bookService: BookService, private toastr: ToastrService, private router: Router, private userService: UserService) {
    this.bookService.search(this.searchTerm$).subscribe((results: any) => {
      results.forEach(element => {
        let occurances = 0;
        if (element.Title.toLowerCase().includes(this.searchTerm.toLowerCase())) occurances++;
        if (element.Author.toLowerCase().includes(this.searchTerm.toLowerCase())) occurances++;
        if (element.Description.toLowerCase().includes(this.searchTerm.toLowerCase())) occurances++;
        element["occurances"] = occurances;
      }),
        this.results = results
    }
    )
  }

  searchTerm

  isLoggedIn: boolean

  ngOnInit(): void {
    this.bookService.refreshList();
    if (localStorage.getItem('userToken') != null) {
      this.userService.loggedIn.next(true)
    }
    this.userService.loggedIn.subscribe((value) => {
      this.isLoggedIn = value;
    })
    this.searchTerm$.subscribe(
      res => this.searchTerm = res
    )
  }

  onDelete(id: number, title: string) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(res => {
        this.bookService.refreshList();
        this.router.navigate(['/welcome']);
        this.toastr.warning('Deleted successfully', `Book '${title}' deleted`);
      });
    }
  }

  onEdit(book: Book) {
    this.bookService.formData = Object.assign({}, book);
    this.router.navigate(['/edit-book']);
  }

  sortBy(prop: string) {
    if(this.results)
    return this.results.sort((a, b) => a[prop] < b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

}
