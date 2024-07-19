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
      loanDate: '', // Khởi tạo form control loanDate với giá trị mặc định là rỗng(startDate là formControlName)
      repaymentDate: '', // Khởi tạo form control repaymentDate với giá trị mặc định là rỗng
      loanTerm: [{ value: 0, disabled: true }],
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
      interest: [{ value: 0, disabled: true }], // Thêm FormControl interest vào FormGroup
      monthlyPayment: [{ value: 0, disabled: true }], // Thêm FormControl monthlyPayment vào FormGroup
      note: '', // Thêm FormControl note vào FormGroup
    });
  }
  ngOnInit(): void {
    this.getBorrowerInformation();
    this.loanForm.get('loanDate')?.valueChanges.subscribe(() => {
      this.calculateDuration();
    });
    this.loanForm.get('repaymentDate')?.valueChanges.subscribe(() => {
      this.calculateDuration();
    });
    this.loanForm.get('loanAmount')?.valueChanges.subscribe(() => {
      this.calculateInterest();
    });
    this.loanForm.get('interestRate')?.valueChanges.subscribe(() => {
      this.calculateInterest();
    });
    this.loanForm.get('loanTerm')?.valueChanges.subscribe(() => {
      this.calculateInterest();
    });
    this.loanForm.get('isInstallment')?.valueChanges.subscribe(()=>{
      this.calculateInterest();
    })
  }

  getBorrowerInformation(): void {
    this.borrowerService.getBorrowerInformation()
      .then((listBorrower) => {
        this.BorrowerInformationList = listBorrower;
      })
      .catch((error) => {
        console.error('Error fetching Borrower list:', error);
      });
  }
  calculateDuration(): void {
    const startDate = this.loanForm.get('loanDate')?.value;
    const endDate = this.loanForm.get('repaymentDate')?.value;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = differenceInDays(end, start);
      if (days >= 0) {
        const roundedMonths = customRound(days / 30);
        this.loanForm.get('loanTerm')?.setValue(roundedMonths);
      } else {
        this.loanForm.get('loanTerm')?.setValue(0);
      }
      //days >= 0: Kiểm tra xem giá trị của days có lớn hơn hoặc bằng 0 không.
      //?: Đây là phần của toán tử điều kiện, nếu điều kiện days >= 0 đúng
      //thì thực hiện biểu thức sau dấu ?.
      //days: Nếu điều kiện days >= 0 là đúng (true), giá trị của days sẽ được dùng.
      //: Đây là phần của toán tử điều kiện, nếu điều kiện days >= 0 sai thì thực hiện biểu thức sau dấu :.
      //0: Nếu điều kiện days >= 0 là sai (false), giá trị 0 sẽ được dùng.
    }
  }
  // Phương thức tính toán lãi suất 
  calculateInterest(): void {
    const loanAmount = this.loanForm.get('loanAmount')?.value;
    const interestRate = this.loanForm.get('interestRate')?.value;
    const duration = this.loanForm.get('loanTerm')?.value;
    const isInstallment = this.loanForm.get('isInstallment')?.value;
  
    if (isInstallment == 0) {
      this.loanForm.get('interest')?.setValue('');
      if (loanAmount && interestRate && duration) {
        const monthlyInterestRate = interestRate / 100 / 12;
        const powerTerm = Math.pow(1 + monthlyInterestRate, duration);
        const monthlyPayment = (loanAmount * monthlyInterestRate * powerTerm) / (powerTerm - 1);
        this.loanForm.get('monthlyPayment')?.setValue(monthlyPayment.toFixed(0));
      } else {
        this.loanForm.get('monthlyPayment')?.setValue('');
      }
    } else if (isInstallment == 1) {
      this.loanForm.get('monthlyPayment')?.setValue('');
  
      if (loanAmount && interestRate && duration) {
        const monthlyInterestRate = interestRate / 12;
        const interest = loanAmount * monthlyInterestRate / 100;
        this.loanForm.get('interest')?.setValue(interest.toFixed(0));
      } else {
        this.loanForm.get('interest')?.setValue('');
      }
    }
  }
  
 
  addLoanInformation(): void {
    try {
      this.loanForm.get('interest')?.enable(); 
      this.loanForm.get('monthlyPayment')?.enable(); 
      this.loanForm.get('loanTerm')?.enable(); 
  
      this.newLoanInformation = {
        ...this.loanForm.value,
        borrowerId: this.loanForm.get('borrowerId')?.value * 1,
        interest: this.loanForm.get('interest')?.value * 1,
        monthlyPayment: this.loanForm.get('monthlyPayment')?.value * 1
      };
      
      console.log(this.newLoanInformation); // Debug: Check data before sending
  
      this.loanInformationService.addLoanInformation(this.newLoanInformation)
        .then((response) => {
          new Toast('success');
          this.newLoanInformation = new LoanInformation();
          this.router.navigate(['/forms/loan-contract']);
        })
        .catch((error) => {
          new Toast('error');
          console.log('Error:', error); // Debug: Check error details
        });
    } catch (error) {
      console.error('Unexpected error:', error); // Debug: Handle unexpected errors
    }
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
