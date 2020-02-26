import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = 'http://localhost:51377';
  constructor(private http: HttpClient, private router: Router) { }
  loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  registerUser(user : User){
    const body: User = {
      Password: user.Password,
      Email: user.Email,
      PhoneNumber: user.PhoneNumber,
      LastName: user.LastName,
      FirstName: user.FirstName,
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + '/api/Register', body, {headers : reqHeader});
  }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }

  getUserClaims(){
   return  this.http.get(this.rootUrl+'/api/GetUserClaims');
   }

   logout() {                          
   this.loggedIn.next(false);
   localStorage.removeItem('userToken');
   this.router.navigate(['/welcome']);
 }
}