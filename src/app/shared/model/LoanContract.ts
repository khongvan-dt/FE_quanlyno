export class LoanContract {
  id: number = 0;
  userId: string = '';
  loanInformationId: number = 0;
  borrowerId?: number;
  loanRequestFormImage: string = '';
  incomeProofImage: string = '';
  collateralImage: string = '';
  compartmentId: string = '';
  note: string = '';
}
