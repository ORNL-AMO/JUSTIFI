import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedEnergyEquipmentModalComponent } from './associated-energy-equipment-modal.component';

describe('AssociatedEnergyEquipmentModalComponent', () => {
  let component: AssociatedEnergyEquipmentModalComponent;
  let fixture: ComponentFixture<AssociatedEnergyEquipmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssociatedEnergyEquipmentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociatedEnergyEquipmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
