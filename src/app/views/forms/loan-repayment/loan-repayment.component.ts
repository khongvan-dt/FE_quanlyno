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
  FormFloatingDirective,
  FormControlDirective,
  FormLabelDirective,
  FormDirective,
  FormSelectDirective,
  GutterDirective,
} from '@coreui/angular';
import { TilleComponent } from '../../tille/tille.component';
import { CommonModule } from '@angular/common';
import { BorrowerService } from 'src/app/shared/service/borrower.service';
import { BorrowerInformation } from 'src/app/shared/model/BorrowerInformation';
import { LoanRepayment } from 'src/app/shared/model/LoanRepayment';
import { LoanInformationService } from 'src/app/shared/service/loanInformation.service';
import { LoanRepaymentService } from 'src/app/shared/service/LoanRepayment.service';
import { LoanInformation } from 'src/app/shared/model/LoanInformation';
import { Toast } from 'src/app/shared/service/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-repayment',
  templateUrl: './loan-repayment.component.html',
  styleUrls: ['./loan-repayment.component.scss'],
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    CommonModule,
    TextColorDirective,
    CardComponent,
    TilleComponent,
    CardHeaderComponent,
    CardBodyComponent,
    FormFloatingDirective,
    FormControlDirective,
    FormLabelDirective,
    ReactiveFormsModule,
    FormsModule,
    FormDirective,
    NgStyle,
    FormSelectDirective,
    GutterDirective,
  ],
})
export class LoanRepaymentComponent {
  newLoanRepayment: LoanRepayment = new LoanRepayment();
  borrowerInformationList: BorrowerInformation[] = [];
  LoanInformationList: LoanInformation[] = [];

  content = 'Thêm khoản trả góp';
  title =
    'Bạn hãy thêm thông tin cơ bản ở dưới form. Những ô nào có (*) thì bắt buộc phải nhập đủ.';

  constructor(
    private borrowerService: BorrowerService,
    private loanInformationService: LoanInformationService,
    private loanRepaymentService: LoanRepaymentService,
    private router: Router
  ) {
    this.getBorrowerInformation();
    this.getLoanInformation();
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

  getBorrowerInformation(): void {
    console.log(this.newLoanRepayment);

    this.borrowerService
      .getBorrowerInformation()
      .then((listBorrower) => {
        this.borrowerInformationList = listBorrower;
      })
      .catch((error) => {
        console.error('Error retrieving Borrower information:', error);
      });
  }

  addLoanRepayment(): void {

    this.loanRepaymentService
      .addLoanRepayment(this.newLoanRepayment)
      .then((response) => {
        new Toast('success');
        this.newLoanRepayment = new LoanRepayment();
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        new Toast('error');
        console.error('Error adding loan repayment:', error);
      });
  }
}
