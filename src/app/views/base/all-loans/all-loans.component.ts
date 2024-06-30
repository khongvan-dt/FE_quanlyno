// import { Component } from '@angular/core';
// import { IconDirective } from '@coreui/icons-angular';
// import { RouterLink } from '@angular/router';

// import {
//   CardBodyComponent,
//   CardComponent,
//   CardHeaderComponent,
//   ColComponent,
//   NavComponent,
//   NavItemComponent,
//   NavLinkDirective,
//   RoundedDirective,
//   RowComponent,
//   TabContentComponent,
//   TabContentRefDirective,
//   TabPaneComponent,
//   TextColorDirective,
// } from '@coreui/angular';
// import axios from 'axios';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// class AllLoan {
//   userId: string = '';
//   phoneNumber: string = '';
//   fullName: string = '';
//   loanInformationName: string = '';
//   loanType: string = '';
//   loanPurpose: string = '';
//   loanAmount: number = 0;
//   interestRate: number = 0;
//   loanTerm: number = 0;
//   hometown:string = '';
//   address:string = '';
//   note:string = '';
//   email: string = '';
//   gender:string ='';
//   identityCardNumber:number=0;
//   isInstallment: boolean | undefined;
//   relativeFullName: string = '';
//   relativePhoneNumber: string = '';
//   loanDone:number = 0;
// }

//  @Component({
//   selector: 'app-all-loans',
//   templateUrl: './all-loans.component.html',
//   styleUrls: ['./all-loans.component.scss'],
//   standalone: true,
//   imports: [
//     RowComponent,
//     ColComponent,
//     TextColorDirective,
//     CardComponent,
//     CardHeaderComponent,
//     CardBodyComponent,
//     NavComponent,
//     NavItemComponent,
//     NavLinkDirective,
//     TabContentRefDirective,
//     RouterLink,
//     IconDirective,
//     TabContentComponent,
//     RoundedDirective,
//     TabPaneComponent,
//     FormsModule,
//     CommonModule
//   ],
// })
// export class AllLoansComponent {
//   AllLoanList: AllLoan[] = [];

//   constructor() {
//     this.getAllLoan();
//   }

//   getAllLoan(): void {
//     const token = localStorage.getItem('token');
//     if(token){
//       const userId = this.getUserIdFromToken(token);
//       const headers = {
//         Authorization: 'Bearer'+ token,
//       };

//       axios
//       .get<AllLoan[]>(`http://localhost:5219/api/BorrowerInformation`,
//         {headers}
//       )
//       .then((response) => {
//         this.AllLoanList = response.data;
//       })
//       .catch((error) => {
//         console.error('Error fetching AllLoan list:', error);
//       });
//     }
//   }
//   getUserIdFromToken(token: string): string {
//     const tokenParts = token.split('.');
//     const payload = JSON.parse(atob(tokenParts[1]));
//     return payload.userId;
//   }
// }
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

class AllLoan {
  userId: string = '';
  phoneNumber: string = '';
  fullName: string = '';
  loanInformationName: string = '';
  loanType: string = '';
  loanPurpose: string = '';
  loanAmount: number = 0;
  interestRate: number = 0;
  loanTerm: number = 0;
  hometown: string = '';
  address: string = '';
  note: string = '';
  email: string = '';
  gender: string = '';
  identityCardNumber: number = 0;
  isInstallment: boolean | undefined;
  relativeFullName: string = '';
  relativePhoneNumber: string = '';
  loanDone: number = 0;
}

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
    CommonModule
  ],
})
export class AllLoansComponent {
  AllLoanList: AllLoan[] = [];

  constructor() {
    this.getAllLoan();
  }

  getAllLoan(): void {
    const token = this.getToken();
    if (token) {
      const userId = this.getUserIdFromToken(token);
      const headers = {
        Authorization: 'Bearer ' + token,
      };

      axios
        .get<AllLoan[]>(`http://localhost:5219/api/BorrowerInformation`, { headers })
        .then((response) => {
          this.AllLoanList = response.data;
        })
        .catch((error) => {
          console.error('Error fetching AllLoan list:', error);
        });
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserIdFromToken(token: string): string {
    const tokenParts = token.split('.');
    const payload = JSON.parse(atob(tokenParts[1]));
    return payload.userId;
  }
}
