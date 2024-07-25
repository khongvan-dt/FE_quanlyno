import { Component, OnInit } from '@angular/core';
import { TilleComponent } from '../../tille/tille.component';
import { NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormFloatingDirective,
  FormControlDirective,
  FormLabelDirective,
  FormDirective,
  FormSelectDirective,
  GutterDirective,
} from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { Toast } from 'src/app/shared/service/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BorrowerService } from '../../../shared/service/borrower.service';
import { BorrowerInformation } from 'src/app/shared/model/BorrowerInformation';

@Component({
  selector: 'app-detail-inportmation-loan',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    CommonModule,
    TextColorDirective,
    CardComponent,
    TilleComponent,
    CardHeaderComponent,
    CardBodyComponent,
    FormFloatingDirective,
    FormControlDirective,
    FormLabelDirective,
    ReactiveFormsModule,
    FormsModule,
    FormDirective,
    NgStyle,
    FormSelectDirective,
    GutterDirective,
  ],
  templateUrl: './detail-inportmation-loan.component.html',
  styleUrls: ['./detail-inportmation-loan.component.scss'],
})
export class DetailInportmationLoanComponent  {
  content = 'Thêm khoản trả góp';
  title =
    'Bạn hãy thêm thông tin cơ bản ở dưới form. Những ô nào có (*) thì bắt buộc phải nhập đủ.';
    borrowerlist: BorrowerInformation | null = null;

  constructor(
    private toast: Toast,
    private borrowerService: BorrowerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // ngOnInit(): void {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (id) {
  //     this.getBorrowerId(+id);
  //   }
  // }

  // getBorrowerId() {
  //   this.borrowerService
  //     .getBorrowerId()
  //     .then((borrower) => {
  //       this.borrowerlist = borrower;
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching borrower:', error);
  //     });
  // }
}
