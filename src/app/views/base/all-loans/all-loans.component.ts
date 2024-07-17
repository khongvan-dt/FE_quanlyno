import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { RouterLink } from '@angular/router';
import { AllLoan } from '../../../shared/model/AllLoan';
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
  AllLoanList: AllLoan[] = [];
  content="Thông tin tất cả các khoản vay(Information on all loans)";
  title = "Bạn có thể xem được thông tin tất cả các khoản vay ở đây.";
  constructor(private allLoanService: AllLoanService) {
    this.getAllLoans();
  }

  // getAllLoan(): void {
  //   const token = this.getToken();
  //   if (token) {
  //     const userId = this.getUserIdFromToken(token);
  //     const headers = {
  //       Authorization: 'Bearer ' + token,
  //     };

  //     axios
  //       .get<AllLoan[]>(`http://localhost:5219/api/BorrowerInformation`, {
  //         headers,
  //       })
  //       .then((response) => {
  //         this.AllLoanList = response.data;
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching AllLoan list:', error);
  //       });
  //   }
  // }

  getAllLoans(): void {
    this.allLoanService.getAllLoan()
      .then(allLoans => {
        this.AllLoanList = allLoans;
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách khoản vay:', error);
      });
  }


  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }

  // getUserIdFromToken(token: string): string {
  //   const tokenParts = token.split('.');
  //   const payload = JSON.parse(atob(tokenParts[1]));
  //   return payload.userId;
  // }
}
