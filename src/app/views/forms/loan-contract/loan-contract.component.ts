import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  UntypedFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  RowComponent,
  FormDirective,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  ButtonGroupComponent,
  ButtonDirective,
} from '@coreui/angular';
import { BorrowerInformationComponent } from '../borrower-Information/borrower-Information.component';
import { TilleComponent } from '../../tille/tille.component';
import { BorrowerService } from '../../../shared/service/borrower.service';
import { BorrowerInformation } from 'src/app/shared/model/BorrowerInformation';
import {LoanContract  } from '../../../shared/model/LoanContract';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loan-contract',
  templateUrl: './loan-contract.component.html',
  styleUrls: ['./loan-contract.component.scss'],
  standalone: true,
  imports: [
    RowComponent,
    ReactiveFormsModule,
    FormDirective,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ButtonGroupComponent,
    ButtonDirective,
    TilleComponent,
    FormsModule,
    CommonModule,
  ],
})
export class LoanContractComponent {
  content = 'Thêm thông tin hợp đồng khoản vay';
  title =
    'Bạn hãy thêm thông tin cơ bản ở dưới from.Những ô nào có (*) thì bắt buộc phải nhập đủ. Ảnh chụp rõ nét để có dữ liệu lưu trữ.';
  BorrowerInformationList: BorrowerInformation[] = [];
  newLoanContract:LoanContract =new LoanContract();
  constructor(private borrowerService: BorrowerService) {
    this.getBorrowerInformation();
  }
  getBorrowerInformation(): void {
    this.borrowerService
      .getBorrowerInformation()
      .then((listBrorrower) => {
        this.BorrowerInformationList = listBrorrower;
      })
      .catch((error) => {
        console.error('Error retrieving borrower information:', error);
      });
  }
}
