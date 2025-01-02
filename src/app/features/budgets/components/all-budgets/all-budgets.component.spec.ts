import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBudgetsComponent } from './all-budgets.component';

describe('AllBudgetsComponent', () => {
  let component: AllBudgetsComponent;
  let fixture: ComponentFixture<AllBudgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllBudgetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllBudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
