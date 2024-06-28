import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
} from '@coreui/angular';
import axios from 'axios';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
class Register {
  UserName: string = '';
  Email: string = '';
  Password: string = '';
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    FormsModule,
  ],
})
export class RegisterComponent {
  newRegister: Register = new Register();
  errorMessage: string = '';
  constructor(private router: Router) {}
  register(): void {
    axios
      .post<any>(
        'http://localhost:5219/api/Authenticate/register-admin',
        this.newRegister
      )
      .then((response) => {
        if (response.status === 200) {
          this.newRegister = new Register();
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Error: Unexpected response from server';
        }
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        this.errorMessage =
        'Error: Failed to register user. Please try again later.<br> Length: 8 characters<br> Have special characters <br> Capitalize the first letter';
      });
  }

}
