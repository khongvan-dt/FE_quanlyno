import { Component } from '@angular/core';
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
import { Router } from '@angular/router';
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
  styleUrl: './detail-inportmation-loan.component.scss'
})
export class DetailInportmationLoanComponent {
  content = 'Thêm khoản trả góp';
  title =
    'Bạn hãy thêm thông tin cơ bản ở dưới form. Những ô nào có (*) thì bắt buộc phải nhập đủ.';
}
