import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormDirective,
  FormLabelDirective,
  FormControlDirective,
  ButtonDirective,
} from '@coreui/angular';
import { BorrowerService } from 'src/app/shared/service/borrower.service';
import { LoanInformationService } from 'src/app/shared/service/loanInformation.service';
import { BorrowerInformation } from 'src/app/shared/model/BorrowerInformation';
import { LoanInformation } from 'src/app/shared/model/LoanInformation';
import { LoanRepayment } from 'src/app/shared/model/LoanRepayment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loan-done',
  templateUrl: './loan-done.component.html',
  styleUrls: ['./loan-done.component.scss'],
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    FormsModule,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
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

  constructor(
    private borrowerService: BorrowerService,
    public loanInformationService: LoanInformationService
  ) {
    this.getBorrowerInformation();
    this.getLoanInformation();
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
    const selectedLoanId = Number(selectHtml.value);

    const selectedLoan = this.LoanInformationList.find(
      (loan) => loan.id === selectedLoanId
    );

    console.log(selectedLoan);

    if (selectedLoan && selectedLoan.isInstallment === 1) {
      this.selectedLoanAmount = selectedLoan.loanAmount;
    } else if (selectedLoan && selectedLoan.isInstallment === 0) {
      this.selectedLoanAmount = selectedLoan.loanAmount;
    } else {
      this.selectedLoanAmount = null;
    }
  }
}
