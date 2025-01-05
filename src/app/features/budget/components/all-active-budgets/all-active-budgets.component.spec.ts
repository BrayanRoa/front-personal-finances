import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllActiveBudgetsComponent } from './all-active-budgets.component';

describe('AllActiveBudgetsComponent', () => {
  let component: AllActiveBudgetsComponent;
  let fixture: ComponentFixture<AllActiveBudgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllActiveBudgetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllActiveBudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
