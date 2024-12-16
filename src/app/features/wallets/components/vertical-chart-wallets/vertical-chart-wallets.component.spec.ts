import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalChartWalletsComponent } from './vertical-chart-wallets.component';

describe('VerticalChartWalletsComponent', () => {
  let component: VerticalChartWalletsComponent;
  let fixture: ComponentFixture<VerticalChartWalletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerticalChartWalletsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerticalChartWalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
