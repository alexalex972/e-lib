import { Component } from '@angular/core';
import { UserService } from './shared/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'inf440';

  isLoggedIn: boolean;
  
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.loggedIn.subscribe((value) =>{
      this.isLoggedIn = value;
    })
  }

  onLogout(){
    this.userService.logout();
  }
}
