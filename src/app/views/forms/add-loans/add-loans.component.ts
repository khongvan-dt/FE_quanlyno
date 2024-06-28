import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { RouterLink } from '@angular/router';
import { RelativeInformationComponent } from '../relative-information/relative-information.component';
import { BorrowerInformationComponent } from '../borrower-Information/borrower-Information.component';
import { LoanContractComponent } from '../loan-contract/loan-contract.component';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormModule,
  NavComponent,
  NavItemComponent,
  NavLinkDirective,
  RoundedDirective,
  RowComponent,
  TabContentComponent,
  TabContentRefDirective,
  TabPaneComponent,
  TextColorDirective,
} from '@coreui/angular';
import { LoanInformationComponent } from '../loan-Information/loan-Information.component';
import { LoanDoneComponent } from '../loan-done/loan-done.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loans',
  templateUrl: './add-loans.component.html',
  styleUrls: ['./add-loans.component.scss'],
  standalone: true,
  imports: [
    LoanDoneComponent,
    LoanInformationComponent,
    LoanContractComponent,
    BorrowerInformationComponent,
    RelativeInformationComponent,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    NavComponent,
    NavItemComponent,
    NavLinkDirective,
    TabContentRefDirective,
    RouterLink,
    IconDirective,
    TabContentComponent,
    RoundedDirective,
    TabPaneComponent,
    FormModule,
    CommonModule,
  ],
})
export class AddLoansComponent implements AfterViewInit {
  activeTabPaneIdx: number = 0;

  private borrowerInfoComponent!: BorrowerInformationComponent;

  ngAfterViewInit() {
    if (!this.borrowerInfoComponent) {
      console.error('BorrowerInformationComponent is not initialized.');
    }
  }

  handleNextTab() {
    this.activeTabPaneIdx++;
  }

  handleSubmit() {
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
