import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TooltipDirective, ButtonDirective } from '@coreui/angular';

@Component({
    selector: 'app-table-borrower-information',
    templateUrl: './table-borrower-information.component.html',
    styleUrls: ['./table-borrower-information.component.scss'],
    standalone: true,
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent,  TooltipDirective, RouterLink, ButtonDirective]
})
export class TableBorrowerInformation {

  constructor() { }

}
