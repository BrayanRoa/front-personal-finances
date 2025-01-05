import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeCardComponent } from './cake-card.component';

describe('CakeCardComponent', () => {
  let component: CakeCardComponent;
  let fixture: ComponentFixture<CakeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CakeCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CakeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
