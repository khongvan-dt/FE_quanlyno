import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInportmationLoanComponent } from './detail-inportmation-loan.component';

describe('DetailInportmationLoanComponent', () => {
  let component: DetailInportmationLoanComponent;
  let fixture: ComponentFixture<DetailInportmationLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailInportmationLoanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailInportmationLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
