import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilleComponent } from './tille.component';

describe('TilleComponent', () => {
  let component: TilleComponent;
  let fixture: ComponentFixture<TilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TilleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
