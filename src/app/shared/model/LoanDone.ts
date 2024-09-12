export class LoanDone {
  id: number = 0;
  loanInformationId?: number;
  borrowerInformationId?: number;
  amountPaid?: number;
  paymentDate: Date | null = null;
  isInstallment?: number;
  note?: string;
}
