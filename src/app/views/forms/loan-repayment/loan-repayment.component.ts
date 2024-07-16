import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormControlDirective, FormLabelDirective, FormDirective, FormSelectDirective, GutterDirective } from '@coreui/angular';

@Component({
    selector: 'app-loan-repayment',
    templateUrl: './loan-repayment.component.html',
    styleUrls: ['./loan-repayment.component.scss'],
    standalone: true,
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent,  FormFloatingDirective, FormControlDirective, FormLabelDirective, ReactiveFormsModule, FormsModule, FormDirective, NgStyle, FormSelectDirective, GutterDirective]
})
export class LoanRepaymentComponent {

  constructor() { }

}
