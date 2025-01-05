import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddUpdateBudgetComponent } from './form-add-update-budget.component';

describe('FormAddUpdateBudgetComponent', () => {
  let component: FormAddUpdateBudgetComponent;
  let fixture: ComponentFixture<FormAddUpdateBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAddUpdateBudgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormAddUpdateBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
