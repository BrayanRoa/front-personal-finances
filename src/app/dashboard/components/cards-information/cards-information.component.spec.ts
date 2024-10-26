import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsInformationComponent } from './cards-information.component';

describe('CardsInformationComponent', () => {
  let component: CardsInformationComponent;
  let fixture: ComponentFixture<CardsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
