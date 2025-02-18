import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyEquipmentHelpComponent } from './energy-equipment-help.component';

describe('EnergyEquipmentHelpComponent', () => {
  let component: EnergyEquipmentHelpComponent;
  let fixture: ComponentFixture<EnergyEquipmentHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnergyEquipmentHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergyEquipmentHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
