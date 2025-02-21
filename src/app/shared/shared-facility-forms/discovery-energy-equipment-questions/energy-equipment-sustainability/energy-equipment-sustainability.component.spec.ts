import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyEquipmentSustainabilityComponent } from './energy-equipment-sustainability.component';

describe('EnergyEquipmentSustainabilityComponent', () => {
  let component: EnergyEquipmentSustainabilityComponent;
  let fixture: ComponentFixture<EnergyEquipmentSustainabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnergyEquipmentSustainabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyEquipmentSustainabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
