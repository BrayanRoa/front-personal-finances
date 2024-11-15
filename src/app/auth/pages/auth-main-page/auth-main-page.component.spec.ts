import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthMainPageComponent } from './auth-main-page.component';

describe('AuthMainPageComponent', () => {
  let component: AuthMainPageComponent;
  let fixture: ComponentFixture<AuthMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthMainPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
