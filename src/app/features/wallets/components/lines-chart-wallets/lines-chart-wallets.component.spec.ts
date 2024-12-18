import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesChartWalletsComponent } from './lines-chart-wallets.component';

describe('LinesChartWalletsComponent', () => {
  let component: LinesChartWalletsComponent;
  let fixture: ComponentFixture<LinesChartWalletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinesChartWalletsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinesChartWalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
