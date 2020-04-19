import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { Book } from 'src/app/shared/book.model';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  objectKeys = Object.keys;
  constructor(public service: BookService, private toastr: ToastrService, private router: Router, private userService: UserService) { }

  isLoggedIn: boolean

  ngOnInit(): void {
    this.service.refreshList();
    if (localStorage.getItem('userToken') != null) {
      this.userService.loggedIn.next(true)
    }
    this.userService.loggedIn.subscribe((value) =>{
      this.isLoggedIn = value;
    })
  }

  populateForm(book: Book) {
    this.service.formData = Object.assign({}, book);
  }

  onDelete(id: number, title: string) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.service.deleteBook(id).subscribe(res => {
        this.service.refreshList();
        this.router.navigate(['/welcome']);
        this.toastr.warning('Deleted successfully', `Book '${title}' deleted`);
      });
    }
  }

  onEdit(book: Book){
      this.service.formData = Object.assign({}, book);
      this.router.navigate(['/edit-book']);
  }
}
