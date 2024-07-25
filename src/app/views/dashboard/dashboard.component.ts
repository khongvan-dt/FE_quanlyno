import { LoanDone } from './../../shared/model/LoanDone';
import { DOCUMENT, NgStyle } from '@angular/common';
import {
  Component,
  WritableSignal,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';

import { RouterLink } from '@angular/router';

import {
  NavComponent,
  NavItemComponent,
  NavLinkDirective,
  TabContentRefDirective,
  TabContentComponent,
  RoundedDirective,
  TabPaneComponent,
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AllLoanService } from '../../shared/service/allLoan.service';
import { LoanDoneService } from '../../shared/service/loanDone.service';

import { AllLoan } from 'src/app/shared/model/AllLoan';
import { LoanInformation } from 'src/app/shared/model/LoanInformation';

import { BorrowerService } from '../../shared/service/borrower.service';
import { LoanInformationService } from '../../shared/service/loanInformation.service';

import { Toast } from '../../shared/service/toast';
import { Router } from '@angular/router';
import { BorrowerInformation } from 'src/app/shared/model/BorrowerInformation';
import {
  WidgetStatAComponent,
  TemplateIdDirective,
  ThemeDirective,
  DropdownComponent,
  DropdownToggleDirective,
  DropdownMenuDirective,
  DropdownItemDirective,
  DropdownDividerDirective,
} from '@coreui/angular';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  standalone: true,
  imports: [
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    IconDirective,
    ReactiveFormsModule,
    ButtonGroupComponent,
    FormCheckLabelDirective,
    NgStyle,
    CardFooterComponent,
    GutterDirective,
    ProgressBarDirective,
    ProgressComponent,
    CardHeaderComponent,
    TableDirective,
    AvatarComponent,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    NavComponent,
    NavItemComponent,
    NavLinkDirective,
    TabContentRefDirective,
    RouterLink,
    IconDirective,
    TabContentComponent,
    RoundedDirective,
    TabPaneComponent,
    FormsModule,
    CommonModule,
    RowComponent,
    ColComponent,
    WidgetStatAComponent,
    TemplateIdDirective,
    IconDirective,
    ThemeDirective,
    DropdownComponent,
    ButtonDirective,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownItemDirective,
    RouterLink,
    DropdownDividerDirective,
  ],
})
export class DashboardComponent {
  allLoanList: AllLoan[] = [];
  loanInformationList: LoanInformation[] = [];
  loanDoneList: LoanDone[] = [];

  content = 'Thông tin tất cả các khoản vay(Information on all loans)';
  title = 'Bạn có thể xem được thông tin tất cả các khoản vay ở đây.';
  borrower: BorrowerInformation | null = null;
  totalRecords: number = 0;
  totalRecords2: number = 0;
  totalRecords3: number = 0;

  constructor(
    private allLoanService: AllLoanService,
    private borrowerService: BorrowerService,
    private router: Router,
    private loanInformationService: LoanInformationService,
    private loanDoneService: LoanDoneService
  ) {
    this.getAllLoans();
    this.getLoanInformation();
    this.getLoanDone();
    this.getLoanInformationAndFilter();
  }

  getAllLoans(): void {
    this.allLoanService
      .getAllLoan()
      .then((allLoans) => {
        this.allLoanList = allLoans;
        this.totalRecords = allLoans.length;
      })
      .catch((error) => {
        console.error('Error fetching AllLoan list:', error);
      });
  }
  getLoanInformation(): void {
    this.loanInformationService
      .getLoanInformation()
      .then((allLoanInformation) => {
        this.loanInformationList = allLoanInformation;
        this.totalRecords2 = allLoanInformation.length;
      })
      .catch((error) => {
        console.error('Error fetching all LoanInformation list:', error);
      });
  }

  getLoanDone(): void {
    this.loanDoneService
      .getLoanDone()
      .then((allLoandone) => {
        this.loanDoneList = allLoandone;
        this.totalRecords3 = allLoandone.length;
      })
      .catch((error) => {
        console.error('Error fetching all LoanInformation list:', error);
      });
  }

  getLoanInformationAndFilter(): void {
    Promise.all([
      this.loanInformationService.getLoanInformation(),
      this.loanDoneService.getLoanDone(),
    ])
      .then(([allLoanInformation, allLoandone]) => {
        this.loanInformationList = allLoanInformation;
        this.loanDoneList = allLoandone;

        const loanDoneIds = new Set(
          this.loanDoneList.map((loanDone) => loanDone.LoanInformationId)
        );
        const filteredLoanInformation = this.loanInformationList.filter(
          (loanInfo) => !loanDoneIds.has(loanInfo.id)
        );

        this.totalRecords2 = filteredLoanInformation.length;
        this.totalRecords3 = this.loanDoneList.length;

        console.log('Filtered LoanInformation:', filteredLoanInformation);
      })
      .catch((error) => {
        console.error(
          'Error fetching LoanInformation or LoanDone list:',
          error
        );
      });
  }

  async delete(id: number): Promise<void> {
    try {
      const confirmed = await Toast.confirmDelete();
      if (confirmed) {
        await this.borrowerService.deleteBorrower(id);
        const toast = new Toast('success');
        toast.successDeleted(true);
        this.getAllLoans();
      } else {
        new Toast('info');
      }
    } catch (error) {
      console.error(`Error deleting Loan with id ${id}:`, error);
      const toast = new Toast('error');
      toast.successDeleted(false);
    }
  }

  navigateToDetail(id: number) {
    this.router.navigate(['/detail/detailinportmationloan']);
  }
}
