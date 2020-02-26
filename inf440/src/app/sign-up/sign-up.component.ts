import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr'
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      Email: '',
      Password: '',
      PhoneNumber: null,
      LastName: '',
      FirstName: '',
    }
  }

  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          this.resetForm(form);
          this.toastr.success('User registration successful');
        }
        else
          this.toastr.error(data.Errors[0]);
      });
  }

}