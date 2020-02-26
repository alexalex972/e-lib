
import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
    {
        path: 'signup', component: SignUpComponent    
    },
    {
        path: 'login', component: SignInComponent
    },
    {
        path: 'welcome', component: WelcomeComponent,
    },
    { path : '', redirectTo:'/welcome', pathMatch : 'full'},
    
];