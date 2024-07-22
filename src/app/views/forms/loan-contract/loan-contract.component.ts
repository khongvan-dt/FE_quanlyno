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
import { LoanContract } from '../../../shared/model/LoanContract';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../../../shared/service/upload.service';
import { LoanInformationService } from '../../../shared/service/loanInformation.service';
import { LoanInformation } from '../../../shared/model/LoanInformation';
import { LoanContractService } from '../../../shared/service/loanContract.service';
import { Router } from '@angular/router';
import { Toast } from 'src/app/shared/service/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-contract',
  templateUrl: './loan-contract.component.html',
  styleUrls: ['./loan-contract.component.scss'],
  standalone: true,
  providers: [UploadService],
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
    'Bạn hãy thêm thông tin cơ bản ở dưới form. Những ô nào có (*) thì bắt buộc phải nhập đủ. Ảnh chụp rõ nét để có dữ liệu lưu trữ.';
  BorrowerInformationList: BorrowerInformation[] = [];
  LoanInformationList: LoanInformation[] = [];
  loanContractForm: FormGroup;
  newLoanContract: LoanContract = new LoanContract();
  selectedImageMap: { [key: string]: string | null } = {};

  constructor(
    private borrowerService: BorrowerService,
    private uploadService: UploadService,
    public loanInformationService: LoanInformationService,
    private loanContractService: LoanContractService,
    private router: Router,
    private fb: FormBuilder
  ) {

    this.loanContractForm = this.fb.group({
      borrowerInformationId: ['', Validators.required],
      loanInformationId: ['', Validators.required],
      loanRequestFormImage: ['', Validators.required],
      incomeProofImage: ['', Validators.required],
      collateralImage: ['', Validators.required],
      compartmentId: ['', Validators.required],
      note: ['', Validators.required],
      userId: ['', Validators.required]


    });
    this.getBorrowerInformation();
    this.getLoanInformation();
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

  getLoanInformation(): void {
    this.loanInformationService
      .getLoanInformation()
      .then((loanInformationList) => {
        this.LoanInformationList = loanInformationList;
      })
      .catch((error) => {
        console.error('Error retrieving Loan information:', error);
      });
  }
  addLoanContract(): void {
    const formValue = this.loanContractForm.value;
    this.newLoanContract.borrowerInformationId = formValue.borrowerInformationId * 1;
    this.newLoanContract.loanInformationId = formValue.loanInformationId * 1;

    // Console log dữ liệu trước khi gửi lên server
    console.log('Dữ liệu người dùng nhập vào:', this.newLoanContract);

    this.loanContractService
      .addLoanContract(this.newLoanContract)
      .then((response) => {
        new Toast('success');
        this.newLoanContract = new LoanContract();
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        new Toast('error');
        console.log('Loan Contract at error:', this.newLoanContract);
        console.error('Error adding Loan Contract:', error);
      });
  }

  onFileSelected(event: any, key: string): void {
    const urlLinlApi = 'http://localhost:5219/api/LoanContract/upload';
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
