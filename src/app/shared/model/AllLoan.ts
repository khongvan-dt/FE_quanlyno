export class AllLoan {
  id: number=0;
  userId?: string;
  phoneNumber?: string;
  fullName?: string;
  loanInformationName?: string;
  loanType?: string;
  loanPurpose?: string;
  loanAmount?: number;
  interestRate?: number;
  loanTerm?: number;
  hometown?: string;
  address?: string;
  note?: string;
  email?: string;
  gender?: number;
  identityCardNumber?: number;
  isInstallment: boolean | undefined;
  relativeFullName?: string;
  relativePhoneNumber?: string;
  loanDone?: number;
}
