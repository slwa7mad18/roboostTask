import { Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { StudentComponent } from './Components/student/student.component';
import { authenticationGuard } from './Gurds/authentication.guard';
import { EditComponent } from './Components/edit/edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canActivate: [authenticationGuard],
  },
];
