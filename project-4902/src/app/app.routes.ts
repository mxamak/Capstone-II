import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResearchCreationComponent } from './research-creation/research-creation.component';

export const routes: Routes = [
    {'path': '', 'title':'Research Finder', component: HomeComponent},
    {'path': 'login', 'title':'login', component: LoginComponent},
    {'path': 'register', 'title':'register', component: RegistrationComponent},
    { 'path': 'research-creation', component: ResearchCreationComponent }
];
