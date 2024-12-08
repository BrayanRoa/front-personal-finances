import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceLineChartComponent } from './balance-line-chart.component';

describe('BalanceLineChartComponent', () => {
  let component: BalanceLineChartComponent;
  let fixture: ComponentFixture<BalanceLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BalanceLineChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BalanceLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
