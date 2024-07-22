
import { Routes } from '@angular/router';
import { DefaultLoanInformationComponent } from './layout';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLoanInformationComponent,
    canActivate: [AuthGuard],

    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'home',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },

      {
        path: '',
        loadChildren: () => import('./views/base/routes').then((m) => m.routes)
      },

      {
        path: 'forms',
        loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
      },
      {
        path: '',
        loadChildren: () => import('./views/detail/routes').then((m) => m.routes)
      },
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'login' }
];
