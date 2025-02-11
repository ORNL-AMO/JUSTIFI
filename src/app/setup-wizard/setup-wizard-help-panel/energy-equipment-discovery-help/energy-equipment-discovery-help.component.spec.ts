import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyEquipmentDiscoveryHelpComponent } from './energy-equipment-discovery-help.component';

describe('EnergyEquipmentDiscoveryHelpComponent', () => {
  let component: EnergyEquipmentDiscoveryHelpComponent;
  let fixture: ComponentFixture<EnergyEquipmentDiscoveryHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnergyEquipmentDiscoveryHelpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyEquipmentDiscoveryHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
