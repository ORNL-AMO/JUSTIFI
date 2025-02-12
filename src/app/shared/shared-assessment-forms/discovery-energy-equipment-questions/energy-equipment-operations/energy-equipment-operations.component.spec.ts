import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyEquipmentOperationsComponent } from './energy-equipment-operations.component';

describe('EnergyEquipmentOperationsComponent', () => {
  let component: EnergyEquipmentOperationsComponent;
  let fixture: ComponentFixture<EnergyEquipmentOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnergyEquipmentOperationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyEquipmentOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
