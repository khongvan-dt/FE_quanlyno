export class LoanDone {
  id: number = 0;
  LoanInformationId?: number;
  BorrowerInformationId?: number;
  AmountPaid?: number;
  PaymentDate: Date | null = null;
  IsInstallment?: number;
  Note?: string;
}
