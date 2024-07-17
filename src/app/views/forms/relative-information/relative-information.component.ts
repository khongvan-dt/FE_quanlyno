import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';

import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  FormLabelDirective,
  FormCheckInputDirective,
  ButtonDirective,
  ThemeDirective,
  DropdownComponent,
  DropdownToggleDirective,
  DropdownMenuDirective,
  DropdownItemDirective,
  DropdownDividerDirective,
  FormSelectDirective,
} from '@coreui/angular';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../../../shared/service/upload.service';
import { Toast } from '../../../shared/service/toast.service';

class RelativeInformation {
  borrowerId?: number;
  fullName: string = '';
  phoneNumber: string = '';
  email?: string;
  identityCardNumber: string = '';
  dateOfIssue?: Date;
  placeOfIssue?: string;
  gender: number = 0;
  dateOfBirth?: Date;
  hometown: string = '';
  address: string = '';
  imageBack: string = '';
  imageFront: string = '';
  portrait: string = '';
  note?: string;
}

class BorrowerInformation {
  id: number = 0;
  userId: string = '';
  fullName: string = '';
}

@Component({
  selector: 'app-relative-information',
  templateUrl: './relative-information.component.html',
  styleUrls: ['./relative-information.component.scss'],
  standalone: true,
  providers: [UploadService],
  imports: [
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    InputGroupComponent,
    InputGroupTextDirective,
    FormControlDirective,
    FormLabelDirective,
    FormCheckInputDirective,
    ButtonDirective,
    ThemeDirective,
    DropdownComponent,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownItemDirective,
    RouterLink,
    DropdownDividerDirective,
    FormSelectDirective,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
})
export class RelativeInformationComponent {
  BorrowerInformationList: BorrowerInformation[] = [];
  selectedBorrowerId: number | undefined;
  selectedImageMap: { [key: string]: string | null } = {};

  @Output() nextTab: EventEmitter<number> = new EventEmitter<number>();

  newRelativeInformation: RelativeInformation = new RelativeInformation();

  constructor(private uploadService: UploadService) {
    this.getBorrowerInformation();
  }

  getBorrowerInformation(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = {
        Authorization: 'Bearer ' + token,
      };
      axios
        .get<BorrowerInformation[]>(
          `http://localhost:5219/api/BorrowerInformation`,
          { headers }
        )
        .then((response) => {
          this.BorrowerInformationList = response.data;
        })
        .catch((error) => {
          console.error('Error fetching Borrower Information list:', error);
        });
    }
  }

  getUserIdFromToken(token: string): string {
    const tokenParts = token.split('.');
    const payload = JSON.parse(atob(tokenParts[1]));
    return payload.userId;
  }

  addRelativeInformation(): void {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    axios
      .post<any>(
        'http://localhost:5219/api/relativeInformation',
        this.newRelativeInformation,
        { headers }
      )
      .then((response) => {
        new Toast('success');
        this.newRelativeInformation = new RelativeInformation();
        this.nextTab.emit();
      })
      .catch((error) => {
        new Toast('error');
      });
  }

  choiserImgFile(event: any, key: string) {
    const urlLinlApi = 'http://localhost:5219/api/RelativeInformation/upload';
    this.uploadService.onFileSelected(event, key, urlLinlApi);
    this.selectedImageMap[key] = this.uploadService.selectedImageMap[key];
  }

  clearSelectedImage(key: string): void {
    this.uploadService.clearSelectedImage(key);
    this.selectedImageMap[key] = this.uploadService.selectedImageMap[key];
  }
  handleEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.addRelativeInformation();
    }
  }
}
