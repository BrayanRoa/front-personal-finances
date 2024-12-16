import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutChartWalletsComponent } from './doughnut-chart-wallets.component';

describe('DoughnutChartWalletsComponent', () => {
  let component: DoughnutChartWalletsComponent;
  let fixture: ComponentFixture<DoughnutChartWalletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoughnutChartWalletsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoughnutChartWalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
