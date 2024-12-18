import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWalletsComponent } from './table-wallets.component';

describe('TableWalletsComponent', () => {
  let component: TableWalletsComponent;
  let fixture: ComponentFixture<TableWalletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableWalletsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableWalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
