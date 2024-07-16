import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Home',
    url: '/home',
    iconComponent: { name: 'cil-speedometer' },
  },

  {
    name: 'Tất cả các khoản cho vay',
    url: '/all-loans',
    iconComponent: { name: 'cil-notes' },
  },
  {
    name: 'Thêm khoản vay',
    url: '/forms',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Thông tin người vay',
        url: 'forms/borrower-information',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Thông tin người thân',
        url: 'forms/relative-information',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Thông tin khoản vay',
        url: 'forms/loan-information',
        icon: 'nav-icon-bullet',
      },

      {
        name: 'Hợp đồng vay mượn',
        url: 'forms/loan-contract',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Trả góp',
        url: '/forms/loan-repayment',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Hoàn thành khoản vay',
        url: '/forms/loan-done',
        icon: 'nav-icon-bullet',
      },
    ],
  },

];
