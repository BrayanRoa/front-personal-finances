import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersTransactionsComponent } from './filters-transactions.component';

describe('FiltersTransactionsComponent', () => {
  let component: FiltersTransactionsComponent;
  let fixture: ComponentFixture<FiltersTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltersTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltersTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
