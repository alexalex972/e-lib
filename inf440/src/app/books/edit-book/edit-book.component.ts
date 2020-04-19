import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/shared/book.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  constructor(public service: BookService, private toastr: ToastrService, private router: Router, private _location: Location) { }

  ngOnInit(): void {
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      BookID: null,
      Title: '',
      Description: '',
      Author: '',
      Publication: null
    }
  }

  updateRecord(form: NgForm) {
    this.service.putEmployee(form.value).subscribe(res => {
      this.toastr.info('Updated successfully', `Book '${this.service.formData.Title}' Updated`);
      this.resetForm(form);
      this.router.navigate(['/welcome']);
      this.service.refreshList();
    });
  }

  Cancel(){
    this._location.back();
  }

}
