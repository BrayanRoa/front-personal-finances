import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsInformationComponent } from './budgets-information.component';

describe('BudgetsInformationComponent', () => {
  let component: BudgetsInformationComponent;
  let fixture: ComponentFixture<BudgetsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetsInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
