import { TilleComponent } from './../../../tille/tille.component';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../../../shared/service/upload.service';
import { BorrowerInformation } from '../../../shared/model/BorrowerInformation'; 
import { BorrowerService } from '../../../shared/service/borrower.service';
import { ScanService } from '../../../shared/service/scan.sevice';

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
import { Toast } from '../../../shared/service/toast.service';

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
  
  frontIdCard: string='';;
  backIdCard: string='';; 
  
  content = "Thêm thông tin khoản vay";
  title = "Bạn hãy thêm thông tin cơ bản ở dưới from.Những ô nào có (*) thì bắt buộc phải nhập đủ.";

  constructor(private uploadService: UploadService, private borrowerService: BorrowerService,private scanService: ScanService) {
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
    this.borrowerService.addBorrower(this.newBorrowerInformation)
      .then((response) => {
        new Toast('success');
        this.newBorrowerInformation = new BorrowerInformation();
      })
      .catch((error) => {
        new Toast('error');
      });
  }

  scanInformation(): void {
    const imagePaths: string[] = [];
    if (this.frontIdCard) {
      imagePaths.push(this.frontIdCard); 
    }
    if (this.backIdCard) {
      imagePaths.push(this.backIdCard); 
    }
  
    this.scanService.Scan(imagePaths)
      .then(response => {
        console.log('Scan thành công:', response.data);
      })
      .catch(error => {
        console.error('Lỗi khi scan:', error);
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
