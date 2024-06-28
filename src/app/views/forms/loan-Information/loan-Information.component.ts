import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { Toast } from '../../../toast';

import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  FormSelectDirective,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  ButtonDirective,
  ColDirective,
  InputGroupComponent,
  InputGroupTextDirective,
} from '@coreui/angular';
import axios from 'axios';
import { FormBuilder, FormGroup } from '@angular/forms';
import { differenceInMonths } from 'date-fns'; // Import function từ date-fns để tính toán
import { differenceInDays } from 'date-fns';

import { CommonModule } from '@angular/common';
class LoanInformation {
  id: number = 0;
  userId: string = '';
  loanInformationName: string = ''; // tên
  borrowerId: number = 0; // Mã người vay (liên kết với bảng BorrowerInformation)
  lender?: string = ''; // Công ty cho vay hoặc người cho vay
  loanType?: number = 0; // Loại hình vay vốn
  loanPurpose?: string = ''; // Mục đích vay vốn
  loanAmount: number = 0.0; // Số tiền vay
  interestRate: number = 0.0; // Lãi suất/năm
  loanTerm: number = 0; // Thời hạn vay
  loanDate?: Date; // Ngày vay
  repaymentDate?: Date; // Ngày trả
  isInstallment: number = 0; // Kiểu vay: true nếu vay trả góp, false nếu vay trả một cục
  monthlyPayment: number = 0.0; // Số tiền gốc cần trả mỗi tháng
  interest: number = 0.0; // Tiền lãi
  note?: string = ''; // Ghi chú
}

class BorrowerInformation {
  id: number = 0;
  userId: string = '';
  fullName: string = '';
}

@Component({
  selector: 'app-loan-information',
  templateUrl: './loan-information.component.html',
  styleUrls: ['./loan-information.component.scss'],
  standalone: true,
  imports: [
    RowComponent,
    CommonModule,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    FormControlDirective,
    ReactiveFormsModule,
    FormsModule,
    FormDirective,
    FormLabelDirective,
    FormSelectDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ButtonDirective,
    ColDirective,
    InputGroupComponent,
    InputGroupTextDirective,
  ],
})
export class LoanInformationComponent {
  newLoanInformation: LoanInformation = new LoanInformation();
  BorrowerInformationList: BorrowerInformation[] = [];
  @Output() nextTab: EventEmitter<number> = new EventEmitter<number>();

  loanForm: FormGroup; // Khai báo form group
  //Mục đích: Dùng để nhóm các điều khiển (form controls)
  //lại với nhau, giúp quản lý trạng thái và giá trị
  //của form một cách dễ dàng và có cấu trúc.
  //Khởi tạo: FormGroup thường được khởi tạo trong
  //constructor của lớp bằng cách sử dụng FormBuilder.

  constructor(private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      borrowerId: '',
      startDate: [''], // Khởi tạo form control startDate với giá trị mặc định là rỗng(startDate là formControlName)
      endDate: [''], // Khởi tạo form control endDate với giá trị mặc định là rỗng
      duration: [{ value: '', disabled: true }],
      // Khởi tạo form control duration và
      //disabled: true có nghĩa là form control duration sẽ bị
      //vô hiệu hóa (disabled) khi form được khởi tạo.người dùng không thể nhập được ô iput
      loanInformationName: '', // Thêm FormControl loanInformationName vào FormGroup
      lender: '', // Thêm FormControl lender vào FormGroup
      loanType: 1, // Thêm FormControl loanType vào FormGroup
      loanPurpose: '', // Thêm FormControl loanPurpose vào FormGroup
      loanAmount: '', // Thêm FormControl loanAmount vào FormGroup
      interestRate: '', // Thêm FormControl interestRate vào FormGroup
      isInstallment: '', // Thêm FormControl isInstallment vào FormGroup
      interest: '', // Thêm FormControl interest vào FormGroup
      monthlyPayment: '', // Thêm FormControl monthlyPayment vào FormGroup
      note: '', // Thêm FormControl note vào FormGroup
    });
  }
  ngOnInit(): void {
    this.getBorrowerInformation();

    // Lắng nghe sự thay đổi của form control startDate
    this.loanForm.get('startDate')?.valueChanges.subscribe(() => {
      this.calculateDuration(); // Gọi hàm tính toán thời hạn khi giá trị thay đổi
    });

    // Lắng nghe sự thay đổi của form control endDate
    this.loanForm.get('endDate')?.valueChanges.subscribe(() => {
      this.calculateDuration(); // Gọi hàm tính toán thời hạn khi giá trị thay đổi
    });
    this.loanForm.get('loanAmount')?.valueChanges.subscribe(() => {
      this.calculateInterest();
    });

    this.loanForm.get('interestRate')?.valueChanges.subscribe(() => {
      this.calculateInterest();
    });

    this.loanForm.get('duration')?.valueChanges.subscribe(() => {
      this.calculateInterest();
    });
  }
  getUserIdFromToken(token: string): string {
    const tokenParts = token.split('.');
    const decodedToken = JSON.parse(atob(tokenParts[1]));
    return decodedToken.userId;
  }
  getBorrowerInformation(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = this.getUserIdFromToken(token);
      const headers = {
        Authorization: 'Bearer ' + token,
      };
      axios
        .get<BorrowerInformation[]>(
          `http://localhost:5219/api/BorrowerInformation?userId=${userId}`,
          { headers }
        )
        .then((response) => {
          this.BorrowerInformationList = response.data;
        })
        .catch((error) => {
          console.error('Error fetching Borrower Information list:', error);
        });
    }
  }

  calculateDuration(): void {
    const startDate = this.loanForm.get('startDate')?.value;
    const endDate = this.loanForm.get('endDate')?.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = differenceInDays(end, start);

      if (days >= 0) {
        const roundedMonths = customRound(days / 30);
        this.loanForm.get('duration')?.setValue(roundedMonths);
      } else {
        this.loanForm.get('duration')?.setValue(0);
      }

      //days >= 0: Kiểm tra xem giá trị của days có lớn hơn hoặc bằng 0 không.
      //?: Đây là phần của toán tử điều kiện, nếu điều kiện days >= 0 đúng
      //thì thực hiện biểu thức sau dấu ?.
      //days: Nếu điều kiện days >= 0 là đúng (true), giá trị của days sẽ được dùng.
      //: Đây là phần của toán tử điều kiện, nếu điều kiện days >= 0 sai thì thực hiện biểu thức sau dấu :.
      //0: Nếu điều kiện days >= 0 là sai (false), giá trị 0 sẽ được dùng.
    }
  }
  calculateInterest(): void {
    const loanAmount = this.loanForm.get('loanAmount')?.value;
    const interestRate = this.loanForm.get('interestRate')?.value;
    const duration = this.loanForm.get('duration')?.value;
    const isInstallment = this.loanForm.get('isInstallment')?.value;
    if (loanAmount && interestRate && duration) {
      if (isInstallment  == 0) {
        const interest = loanAmount * (interestRate / 100) * duration;
        this.loanForm.get('interest')?.setValue(interest.toFixed(2));
      }else{
        // const interest = loanAmount * (interestRate / 100) * duration;
        // this.loanForm.get('interest')?.setValue(interest.toFixed(2));
      }
    }
  }

  addLoanInformation(): void {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };

    const borrowerId = this.loanForm.get('borrowerId')?.value;
    const loanInformationName = this.loanForm.get('loanInformationName')?.value;
    const lender = this.loanForm.get('lender')?.value;
    const loanType = this.loanForm.get('loanType')?.value;
    const loanPurpose = this.loanForm.get('loanPurpose')?.value;
    const loanAmount = this.loanForm.get('loanAmount')?.value;
    const interestRate = this.loanForm.get('interestRate')?.value;
    const startDate = this.loanForm.get('startDate')?.value;
    const endDate = this.loanForm.get('endDate')?.value;
    const duration = this.loanForm.get('duration')?.value;
    const isInstallment = this.loanForm.get('isInstallment')?.value;
    const note = this.loanForm.get('note')?.value;
    const interest = this.loanForm.get('interest')?.value;
    const monthlyPayment = this.loanForm.get('monthlyPayment')?.value;

    console.log('Người vay:', borrowerId);
    console.log('Tên thông tin khoản vay:', loanInformationName);
    console.log('Người cho vay:', lender);
    console.log('Loại khoản vay:', loanType);
    console.log('Mục đích khoản vay:', loanPurpose);
    console.log('Số tiền vay:', loanAmount);
    console.log('Lãi suất:', interestRate);
    console.log('Ngày bắt đầu:', startDate);
    console.log('Ngày kết thúc:', endDate);
    console.log('Thời hạn:', duration);
    console.log('Có trả góp:', isInstallment);
    console.log('Ghi chú:', note);
    console.log('Lãi:', interest);
    console.log('Thanh toán hàng tháng:', monthlyPayment);

    const formData = this.loanForm.value; // Lấy dữ liệu từ form

    axios
      .post<any>('http://localhost:5219/api/LoanInformation', formData, {
        headers,
      })
      .then((response) => {
        new Toast('success');
        this.newLoanInformation = new LoanInformation();
        this.nextTab.emit();
      })
      .catch((error) => {
        new Toast('error');
      });
  }
}

function customRound(number: number): number {
  const decimalPart = number - Math.floor(number);
  if (decimalPart >= 0.5) {
    return Math.ceil(number);
  } else {
    return Math.floor(number);
  }
  //   Nếu phần thập phân lớn hơn hoặc bằng 0.5, ta làm tròn số lên, sử dụng hàm Math.ceil().
  //   Điều này có nghĩa là nếu số gần nhất với số gốc từ phía trên là số nguyên, ta sẽ làm tròn lên thành số nguyên đó.
  // Nếu phần thập phân nhỏ hơn 0.5, ta làm tròn số xuống, sử dụng hàm Math.floor().
  //  Điều này có nghĩa là nếu số gần nhất với số gốc từ phía dưới là số nguyên, ta sẽ làm tròn xuống thành số nguyên đó.
}
