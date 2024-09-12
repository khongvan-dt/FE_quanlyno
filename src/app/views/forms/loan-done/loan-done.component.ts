import { Component } from '@angular/core';
import { TilleComponent } from '../../tille/tille.component';

import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormDirective,
  ButtonDirective,
} from '@coreui/angular';
import { BorrowerService } from 'src/app/shared/service/borrower.service';
import { LoanInformationService } from 'src/app/shared/service/loanInformation.service';
import { BorrowerInformation } from 'src/app/shared/model/BorrowerInformation';
import { LoanInformation } from 'src/app/shared/model/LoanInformation';
import { LoanRepayment } from 'src/app/shared/model/LoanRepayment';
import { CommonModule } from '@angular/common';
import { LoanDoneService } from 'src/app/shared/service/loanDone.service';
import { LoanDone } from 'src/app/shared/model/LoanDone';
import { Toast } from 'src/app/shared/service/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-done',
  templateUrl: './loan-done.component.html',
  styleUrls: ['./loan-done.component.scss'],
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
    ButtonDirective,
    TilleComponent,
    FormsModule,
    CommonModule,
  ],
})
export class LoanDoneComponent {
  BorrowerInformationList: BorrowerInformation[] = [];
  LoanInformationList: LoanInformation[] = [];
  filteredLoanInformationList: LoanInformation[] = [];
  newLoanRepayment: LoanRepayment = new LoanRepayment();
  selectedLoanInformation?: LoanInformation;
  loanAmount: number | null = null;
  selectedLoanAmount: number | null = null;
  newLoanDone: LoanDone = new LoanDone();
  loanDoneForm: FormGroup;

  constructor(
    private borrowerService: BorrowerService,
    public loanInformationService: LoanInformationService,
    private loanDoneService: LoanDoneService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.getBorrowerInformation();
    this.getLoanInformation();
    this.loanDoneForm = this.fb.group({
      borrowerInformationId: ['', Validators.required],
      loanInformationId: ['', Validators.required],
      amountPaid: ['', Validators.required],
      paymentDate: ['', Validators.required],
      isInstallment: ['', Validators.required],
      note: ['', Validators.required],
    });
  }

  getBorrowerInformation(): void {
    this.borrowerService
      .getBorrowerInformation()
      .then((listBorrower) => {
        this.BorrowerInformationList = listBorrower;
      })
      .catch((error) => {
        console.error('Error fetching Borrower list:', error);
      });
  }

  getLoanInformation(): void {
    this.loanInformationService
      .getLoanInformation()
      .then((loanInformationList) => {
        this.LoanInformationList = loanInformationList;
        this.filteredLoanInformationList = loanInformationList;
      })
      .catch((error) => {
        console.error('Error retrieving Loan information:', error);
      });
  }

  onBorrowerChange(event: Event): void {
    // // Ép kiểu event.target thành HTMLSelectElement để lấy giá trị value
    // const selectElement = event.target as HTMLSelectElement;
    // // Lấy giá trị value từ selectElement và chuyển thành số
    // const borrowerId = Number(selectElement.value);
    // // Lọc danh sách thông tin khoản vay dựa trên borrowerId
    // this.filteredLoanInformationList = this.LoanInformationList.filter(
    //   loan => loan.borrowerId === borrowerId
    // );
    const selectHtml = event.target as HTMLSelectElement;
    const borrowerId = Number(selectHtml.value);
    this.filteredLoanInformationList = this.LoanInformationList.filter(
      (loan) => loan.borrowerId === borrowerId
    );
  }

  onLoanInfoChange(event: Event): void {
    const selectHtml = event.target as HTMLSelectElement;
    LoanRepayment
    const selectedLoanId = Number(selectHtml.value);

    const selectedLoan = this.LoanInformationList.find( 
      (loan) => loan.id === selectedLoanId
    );
    if (selectedLoan && selectedLoan.isInstallment === 1) {
      this.selectedLoanAmount = selectedLoan.loanAmount;
    } else if (selectedLoan && selectedLoan.isInstallment === 0) {
      this.selectedLoanAmount = selectedLoan.loanAmount;
    } else {
      this.selectedLoanAmount = null;
    }
  }
  addLoanDone(): void {
    const formValue = this.loanDoneForm.value;
    this.newLoanDone.borrowerInformationId =
      formValue.borrowerInformationId * 1;
    this.newLoanDone.loanInformationId = formValue.loanInformationId * 1;
    this.newLoanDone.isInstallment = formValue.isInstallment * 1;
    this.newLoanDone.amountPaid = formValue.amountPaid * 1;
    this.loanDoneService
      .addLoanDone(this.newLoanDone)
      .then((response) => {
        new Toast('success');
        this.newLoanDone = new LoanDone();
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        new Toast('error');
        console.log('Loan Contract at error:', this.newLoanDone);
        console.error('Error adding Loan Contract:', error);
      });
  }
}
