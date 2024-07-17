import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base'
    },
    children: [
      {
        path: 'tables',
        loadComponent: () => import('./tables/tables.component').then(m => m.TablesComponent),
        data: {
          title: 'Tables'
        }
      },
      {
        path: 'all-loans',
        loadComponent: () => import('./all-loans/all-loans.component').then(m => m.AllLoansComponent),
        data: {
          title: 'all-loans'
        }
      },
      {
        path: 'borrower-information',
        loadComponent: () => import('./table-borrower-information/table-borrower-information.component').then(m => m.TableBorrowerInformation),
        data: {
          title: 'table-borrower-information'
        }
      }
    ]
  }
];


