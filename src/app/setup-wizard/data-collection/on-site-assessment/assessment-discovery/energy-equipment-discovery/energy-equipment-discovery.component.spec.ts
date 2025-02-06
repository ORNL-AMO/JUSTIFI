import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyEquipmentDiscoveryComponent } from './energy-equipment-discovery.component';

describe('EnergyEquipmentDiscoveryComponent', () => {
  let component: EnergyEquipmentDiscoveryComponent;
  let fixture: ComponentFixture<EnergyEquipmentDiscoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnergyEquipmentDiscoveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyEquipmentDiscoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
