import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit {

  isLoginError : boolean = false;
  constructor(private userService : UserService,private router : Router) { }

  ngOnInit() {
  }

  OnSubmit(userName,password){
     this.userService.userAuthentication(userName,password).subscribe((data : any)=>{
      localStorage.setItem('userToken',data.access_token);
      this.userService.loggedIn.next(true)
      this.router.navigate(['/welcome']);
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
    });
  }
}
