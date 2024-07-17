import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {
  FormControl,
  UntypedFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  RowComponent,
  FormDirective,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  ButtonGroupComponent,
  ButtonDirective,
} from '@coreui/angular';
import { BorrowerInformationComponent } from '../borrower-Information/borrower-Information.component';
import { TilleComponent } from 'src/app/tille/tille.component';

@Component({
  selector: 'app-loan-contract',
  templateUrl: './loan-contract.component.html',
  styleUrls: ['./loan-contract.component.scss'],
  standalone: true,
  imports: [
    RowComponent,
    ReactiveFormsModule,
    FormDirective,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ButtonGroupComponent,
    ButtonDirective,
    TilleComponent
  ],
})

export class LoanContractComponent implements AfterViewInit {

  @ViewChild(BorrowerInformationComponent)
  private borrowerInfoComponent!: BorrowerInformationComponent;
  content="Thông tin tất cả các khoản vay(Information on all loans)";
  title = "Bạn có thể xem được thông tin tất cả các khoản vay ở đây.";
  ngAfterViewInit() {
    if (!this.borrowerInfoComponent) {
      console.error('BorrowerInformationComponent is not initialized.');
    }
  }

  handleSubmit() {
    console.log('Submitting loan contract form...');
    if (this.borrowerInfoComponent) {
      try {
        this.borrowerInfoComponent.addBorrowerInformation();
        console.log('Borrower information added successfully.');
      } catch (error) {
        console.error('Failed to add borrower information:', error);
      }
    }
  }
}
