import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedEnergyEquipmentButtonsComponent } from './associated-energy-equipment-buttons.component';

describe('AssociatedEnergyEquipmentButtonsComponent', () => {
  let component: AssociatedEnergyEquipmentButtonsComponent;
  let fixture: ComponentFixture<AssociatedEnergyEquipmentButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssociatedEnergyEquipmentButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociatedEnergyEquipmentButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
