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
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AllLoanService } from '../../../shared/service/allLoan.service';
import { AllLoan } from 'src/app/shared/model/AllLoan';


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
  content="Thông tin tất cả các khoản vay(Information on all loans)";
  title = "Bạn có thể xem được thông tin tất cả các khoản vay ở đây.";
  constructor(private allLoanService: AllLoanService) {
    this.getAllLoans();
  }

  getAllLoans(): void {
    this.allLoanService.getAllLoan()
      .then((allLoans) => {
        this.allLoanList = allLoans;
      })
      .catch((error) => {
        console.error('Error fetching AllLoan list:', error);
      });
  }
}
