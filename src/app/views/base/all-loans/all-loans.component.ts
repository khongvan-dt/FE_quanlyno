import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { RouterLink } from '@angular/router';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  NavComponent,
  NavItemComponent,
  NavLinkDirective,
  RoundedDirective,
  RowComponent,
  TabContentComponent,
  TabContentRefDirective,
  TabPaneComponent,
  TextColorDirective,
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AllLoanService } from '../../../shared/service/allLoan.service';
import { AllLoan } from 'src/app/shared/model/AllLoan';
import { BorrowerService } from '../../../shared/service/borrower.service';
import { Toast } from '../../../shared/service/toast'; 
import { Router } from '@angular/router';
import { BorrowerInformation } from 'src/app/shared/model/BorrowerInformation';

@Component({
  selector: 'app-all-loans',
  templateUrl: './all-loans.component.html',
  styleUrls: ['./all-loans.component.scss'],
  standalone: true,
  imports: [
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
  ],
})
export class AllLoansComponent {
  allLoanList: AllLoan[] = [];
  content = 'Thông tin tất cả các khoản vay(Information on all loans)';
  title = 'Bạn có thể xem được thông tin tất cả các khoản vay ở đây.';
  borrower: BorrowerInformation | null = null;

  constructor(
    private allLoanService: AllLoanService,
    private borrowerService: BorrowerService,
    private router: Router
  ) {
    this.getAllLoans();
  }

  getAllLoans(): void {
    this.allLoanService
      .getAllLoan()
      .then((allLoans) => {
        this.allLoanList = allLoans;
      })
      .catch((error) => {
        console.error('Error fetching AllLoan list:', error);
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
