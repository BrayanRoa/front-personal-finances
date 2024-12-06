import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownCustomizedComponent } from './drop-down-customized.component';

describe('DropDownCustomizedComponent', () => {
  let component: DropDownCustomizedComponent;
  let fixture: ComponentFixture<DropDownCustomizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropDownCustomizedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropDownCustomizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
