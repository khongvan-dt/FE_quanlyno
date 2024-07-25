export class LoanRepayment{
  id: number = 0 ;
  userId: string = '';
  loanInformationId?: number;
  borrowerInformationId?: number;
  amountPaid?:number;
  paymentDate?:Date;
  note: string = '';
}
