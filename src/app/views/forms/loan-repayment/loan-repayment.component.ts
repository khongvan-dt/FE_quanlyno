import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormControlDirective, FormLabelDirective, FormDirective, FormSelectDirective, GutterDirective } from '@coreui/angular';
import { TilleComponent } from '../../tille/tille.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-loan-repayment',
    templateUrl: './loan-repayment.component.html',
    styleUrls: ['./loan-repayment.component.scss'],
    standalone: true,
    imports: [RowComponent, ColComponent,CommonModule,
      TextColorDirective, CardComponent,TilleComponent, CardHeaderComponent, CardBodyComponent,  FormFloatingDirective, FormControlDirective, FormLabelDirective, ReactiveFormsModule, FormsModule, FormDirective, NgStyle, FormSelectDirective, GutterDirective]
})
export class LoanRepaymentComponent {

  constructor() { }
  content = "Thêm thông tin người vay";
  title = "Bạn hãy thêm thông tin cơ bản ở dưới from.Những ô nào có (*) thì bắt buộc phải nhập đủ.";

}
