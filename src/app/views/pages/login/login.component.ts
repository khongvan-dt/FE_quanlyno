import { Component } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';
class UserLogin {
  id: number = 0;
  UserName: string = '';
  Email: string = '';
  Password: string = '';
  idRole: string = '';
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
    FormsModule,
    HttpClientModule,
  ],
})
export class LoginComponent {
  userLogin: UserLogin = new UserLogin();
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    this.http
      .post<any>('http://localhost:5219/api/Authenticate/login', this.userLogin)
      .subscribe(
        (response) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/base/all-loans']);
          } else {
            this.errorMessage = 'Invalid username or password';
          }
        },
        (error) => {
          console.error('Error during login:', error);
          this.errorMessage = 'An error occurred while trying to log in';
        }
      );
  }
  
}
