import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarBarChartComponent } from './polar-bar-chart.component';

describe('PolarBarChartComponent', () => {
  let component: PolarBarChartComponent;
  let fixture: ComponentFixture<PolarBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolarBarChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PolarBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
