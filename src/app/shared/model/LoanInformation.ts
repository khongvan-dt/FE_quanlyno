export class LoanInformation {
  userId: string = '';
  loanInformationName: string = ''; // tên
  borrowerId?: number;  // Mã người vay (liên kết với bảng BorrowerInformation)
  lender?: string = ''; // Công ty cho vay hoặc người cho vay
  loanType?: number = 0; // Loại hình vay vốn
  loanPurpose?: string = ''; // Mục đích vay vốn
  loanAmount: number = 0.0; // Số tiền vay
  interestRate?: number ; // Lãi suất/năm
  loanTerm: number = 0; // Thời hạn vay
  loanDate?: Date; // Ngày vay
  repaymentDate?: Date; // Ngày trả
  isInstallment: number = 0; // Kiểu vay: true nếu vay trả góp, false nếu vay trả một cục
  monthlyPayment?: number = 0;  // Số tiền gốc cần trả mỗi tháng
  interest?: number = 0;  // Tiền lãi
  note?: string = ''; // Ghi chú
}
