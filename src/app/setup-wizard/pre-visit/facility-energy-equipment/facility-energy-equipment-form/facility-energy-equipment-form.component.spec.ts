import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityEnergyEquipmentFormComponent } from './facility-energy-equipment-form.component';

describe('FacilityEnergyEquipmentFormComponent', () => {
  let component: FacilityEnergyEquipmentFormComponent;
  let fixture: ComponentFixture<FacilityEnergyEquipmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacilityEnergyEquipmentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityEnergyEquipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
