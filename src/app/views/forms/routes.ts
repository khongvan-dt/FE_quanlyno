import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Forms'
    },
    children: [
      {
        path: '',
        redirectTo: 'form-control',
        pathMatch: 'full'
      },
      {
        path: 'loan-done',
        loadComponent: () => import('./loan-done/loan-done.component').then(m => m.LoanDoneComponent),
        data: {
          title: 'Form Control'
        }
      },
      {
        path: 'borrower-information',
        loadComponent: () => import('./borrower-Information/borrower-Information.component').then(m => m.BorrowerInformationComponent),
        data: {
          title: 'Borrower Information'
        }
      },
      {
        path: 'loan-contract',
        loadComponent: () => import('./loan-contract/loan-contract.component').then(m => m.LoanContractComponent),
        data: {
          title: 'Loan Contract'
        }
      },

      {
        path: 'loan-information',
        loadComponent: () => import('./loan-Information/loan-Information.component').then(m => m.LoanInformationComponent),
        data: {
          title: 'Loan Information'
        }
      },
      {
        path: 'loan-repayment',
        loadComponent: () => import('./loan-repayment/loan-repayment.component').then(m => m.LoanRepaymentComponent),
        data: {
          title: 'Loan Information'
        }
      },
      {
        path: 'relative-information',
        loadComponent: () => import('./relative-information/relative-information.component').then(m => m.RelativeInformationComponent),
        data: {
          title: 'Relative Information'
        }
      },
      {
        path: 'add-loans',
        loadComponent: () => import('./add-loans/add-loans.component').then(m => m.AddLoansComponent),
        data: {
          title: 'add-loans'
        }
      },

    ]
  }
];
