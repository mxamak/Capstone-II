import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

export const routes: Routes = [
    {'path': '', component: HomeComponent},
    {'path': 'login', component: LoginComponent},
    {'path': 'register', component: RegistrationComponent},
];
