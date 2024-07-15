import { TilleComponent } from './../../../tille/tille.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadService  } from '../../../upload.service';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormSelectDirective,
} from '@coreui/angular';
import axios from 'axios';
import { Toast } from '../../../toast';

class BorrowerInformation {
  UserId: string = '';
  FullName: string = '';
  PhoneNumber: string = '';
  Email: string = '';
  IdentityCardNumber: string = '';
  DateOfIssue: Date | null = null;
  PlaceOfIssue: string = '';
  Gender: Number = 2;
  DateOfBirth: Date | null = null;
  Hometown: string = '';
  Address: string = '';
  ImageBack: string = '';
  ImageFront: string = '';
  Portrait: string = '';
  LoanDone: number = 2;
  Note: string = '';
}

@Component({
  selector: 'app-borrower-information',
  templateUrl: './borrower-information.component.html',
  styleUrls: ['./borrower-information.component.scss'],
  standalone: true,
  providers: [UploadService],
  imports: [
    MatTabsModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    FormSelectDirective,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TilleComponent
  ],
})
export class BorrowerInformationComponent {
  newBorrowerInformation: BorrowerInformation = new BorrowerInformation();
  selectedImageMap: { [key: string]: string | null } = {};

  content="Thêm thông tin khoản vay";
  title = "Bạn hãy thêm thông tin cơ bản ở dưới form .";


  constructor(private uploadService: UploadService) {
    this.newBorrowerInformation = new BorrowerInformation();
    this.newBorrowerInformation.FullName = 'Nguyễn Văn A';
    this.newBorrowerInformation.PhoneNumber = '34343444444';
    this.newBorrowerInformation.Email = 'Van@gmail.com';
    this.newBorrowerInformation.IdentityCardNumber = '34343444444';
    this.newBorrowerInformation.PlaceOfIssue = 'HN';
    this.newBorrowerInformation.Gender = 1;
    this.newBorrowerInformation.Hometown = 'Quê hương';
    this.newBorrowerInformation.Address = 'Địa chỉ thường trú';
    this.newBorrowerInformation.LoanDone = 1;
    this.newBorrowerInformation.Note = 'Ghi chú';
  }

  addBorrowerInformation(): void {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    axios
      .post<any>(
        'http://localhost:5219/api/BorrowerInformation',
        this.newBorrowerInformation,
        { headers }
      )
      .then((response) => {
        new Toast('success');
        this.newBorrowerInformation = new BorrowerInformation();
       
      })
      .catch((error) => {
        new Toast('error');
      });
  }

  onFileSelected(event: any, key: string): void {
    const urlLinlApi = 'http://localhost:5219/api/BorrowerInformation/upload';
    this.uploadService.onFileSelected(event, key, urlLinlApi);
    this.selectedImageMap[key] = this.uploadService.selectedImageMap[key];
  }

  clearSelectedImage(key: string): void {
    this.uploadService.clearSelectedImage(key);
    this.selectedImageMap[key] = this.uploadService.selectedImageMap[key];
  }
}






