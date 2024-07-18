import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { Toast } from '../../../shared/service/toast.service';
import { TilleComponent } from '../../tille/tille.component';
import { Router } from '@angular/router';
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
import { LoanInformationService } from '../../../shared/service/loanInformation.service';
import { LoanInformation } from '../../../shared/model/LoanInformation';
import { BorrowerService } from '../../../shared/service/borrower.service';
import { BorrowerInformation } from '../../../shared/model/BorrowerInformation';


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
    TilleComponent,
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

  content = "Thêm thông tin khoản vay";
  title = "Bạn hãy thêm thông tin cơ bản ở dưới from.Những ô nào có (*) thì bắt buộc phải nhập đủ.Bạn chỉ cần nhập: Số tiền vay, Ngày vay, Ngày trả, Lãi xuất/năm, Kiểu vay. Sẽ tự động hiển thị ra số tiền cần trả hằng tháng tương ứng với kiểu vay.";

  loanForm: FormGroup; // Khai báo form group
  //Mục đích: Dùng để nhóm các điều khiển (form controls)
  //lại với nhau, giúp quản lý trạng thái và giá trị
  //của form một cách dễ dàng và có cấu trúc.
  //Khởi tạo: FormGroup thường được khởi tạo trong
  //constructor của lớp bằng cách sử dụng FormBuilder.

  constructor(private fb: FormBuilder, private router: Router, private borrowerService: BorrowerService, private loanInformationService: LoanInformationService) {
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
      interest: [{ value: '', disabled: true }], // Thêm FormControl interest vào FormGroup
      monthlyPayment: [{ value: '', disabled: true }], // Thêm FormControl monthlyPayment vào FormGroup
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

  getBorrowerInformation(): void {
    this.borrowerService.getBorrowerInformation()
      .then((listBorrower) => {
        this.BorrowerInformationList = listBorrower;
        console.log(this.BorrowerInformationList)
      })
      .catch((error) => {
        console.error('Error fetching Borrower list:', error);
      });
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

  // Phương thức tính toán lãi suất và các giá trị liên quan
  calculateInterest(): void {
    const loanAmount = this.loanForm.get('loanAmount')?.value;
    const interestRate = this.loanForm.get('interestRate')?.value;
    const duration = this.loanForm.get('duration')?.value;
    const isInstallment = this.loanForm.get('isInstallment')?.value;

    if (isInstallment == 0) {
      if (loanAmount && interestRate && duration) {
        const monthlyInterestRate = interestRate/ 100 / 12;
        const powerTerm = Math.pow(1 + monthlyInterestRate, duration);
        const monthlyPayment = (loanAmount * monthlyInterestRate * powerTerm) / (powerTerm - 1);
        this.loanForm.get('monthlyPayment')?.setValue(monthlyPayment.toFixed(3));
      }
    }
    if (isInstallment == 1) {
      if (loanAmount && interestRate && duration) {
        const monthlyInterestRate = interestRate / 12;
        console.log(monthlyInterestRate);
        const interest = loanAmount * monthlyInterestRate/100;
        this.loanForm.get('interest')?.setValue(interest.toFixed(3));
      }
    }
  }

  addLoanInformation(): void {
    this.loanInformationService.addLoanInformation(this.newLoanInformation)
      .then((response) => {
        new Toast('success');
        this.newLoanInformation = new LoanInformation();
        this.router.navigate(['/forms/loan-contract']);
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
