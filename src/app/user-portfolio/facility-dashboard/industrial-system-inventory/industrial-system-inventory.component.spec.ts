import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrialSystemInventoryComponent } from './industrial-system-inventory.component';

describe('IndustrialSystemInventoryComponent', () => {
  let component: IndustrialSystemInventoryComponent;
  let fixture: ComponentFixture<IndustrialSystemInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndustrialSystemInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustrialSystemInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
