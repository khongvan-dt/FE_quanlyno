import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'detail',
    data: {
      title: 'detail'
    },
    children: [
      {
        path: 'detailinportmationloan',
        loadComponent: () => import('./detail-inportmation-loan/detail-inportmation-loan.component').then(m => m.DetailInportmationLoanComponent),
        data: {
          title: 'Detail Inportmation Loan'
        }
      },

    ]
  }
];


