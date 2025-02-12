import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyEquipmentTakeStockComponent } from './energy-equipment-take-stock.component';

describe('EnergyEquipmentTakeStockComponent', () => {
  let component: EnergyEquipmentTakeStockComponent;
  let fixture: ComponentFixture<EnergyEquipmentTakeStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnergyEquipmentTakeStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyEquipmentTakeStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
