import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrialSystemInventoryHomeComponent } from './industrial-system-inventory-home.component';

describe('IndustrialSystemInventoryHomeComponent', () => {
  let component: IndustrialSystemInventoryHomeComponent;
  let fixture: ComponentFixture<IndustrialSystemInventoryHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndustrialSystemInventoryHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustrialSystemInventoryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
