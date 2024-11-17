import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanksInformationComponent } from './banks-information.component';

describe('BanksInformationComponent', () => {
  let component: BanksInformationComponent;
  let fixture: ComponentFixture<BanksInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BanksInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BanksInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
