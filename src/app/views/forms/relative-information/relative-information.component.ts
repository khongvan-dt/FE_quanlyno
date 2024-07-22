import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { TilleComponent } from '../../tille/tille.component';

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
import { Router } from '@angular/router';
import { BorrowerInformation } from 'src/app/shared/model/BorrowerInformation';
import { BorrowerService } from '../../../shared/service/borrower.service';
import { RelativeInformation } from '../../../shared/model/RelativeInformation';
import { RelativeInformationservice } from '../../../shared/service/relativeInformation.service';


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
    TilleComponent,
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

  newRelativeInformation: RelativeInformation = new RelativeInformation();
  content = "Thêm thông tin người thân của người vay nợ";
  title = "Bạn hãy thêm thông tin cơ bản ở dưới from.Những ô nào có (*) thì bắt buộc phải nhập đủ.";
  constructor(private uploadService: UploadService, private router: Router, private borrowerService: BorrowerService, private relativeInformationservice: RelativeInformationservice) {
    this.getBorrowerInformation();
  }

  getBorrowerInformation(): void {
    this.borrowerService.getBorrowerInformation()
      .then((listBrorrower) => {
        this.BorrowerInformationList = listBrorrower;
      })
      .catch((error) => {
        console.error('Error fetching Brorrower list:', error);
      })
  }
  addRelativeInformation(): void {
    this.relativeInformationservice.addRelativeInformation(this.newRelativeInformation)
      .then((response) => {
        new Toast('success');
        this.newRelativeInformation = new RelativeInformation();
        this.router.navigate(['/forms/loan-information']);
      })
      .catch((error) => {
        new Toast('error');
      });
  }

  onFileSelected(event: any, key: string): void {
    const urlLinlApi = 'http://localhost:5219/api/RelativeInformation/upload';
    this.uploadService.onFileSelected(event, key, urlLinlApi);
    setTimeout(() => {
      this.selectedImageMap[key] = this.uploadService.selectedImageMap[key];
    }, 200);
  }

  clearSelectedImage(key: string): void {
    this.uploadService.clearSelectedImage(key);
    this.selectedImageMap[key] = this.uploadService.selectedImageMap[key];
  }
}
