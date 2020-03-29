import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor(public service: BookService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if (form != null)
      form.resetForm();
    this.service.formData = {
      BookID : null,
      Title : '',
      Description : '',
      Author : '',
      Publication : null
    }
  }

  onSubmit(form: NgForm) {
      this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    try {
      this.service.postBook(form.value).subscribe(res => {
        this.toastr.success('Inserted successfully', 'Book Added');
        this.resetForm(form);
        this.service.refreshList();
        this.router.navigate(['/welcome']);

      });
    } catch (error) {
      console.log(error)
    }

  }

}
