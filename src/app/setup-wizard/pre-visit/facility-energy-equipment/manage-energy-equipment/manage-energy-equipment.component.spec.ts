import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEnergyEquipmentComponent } from './manage-energy-equipment.component';

describe('ManageEnergyEquipmentComponent', () => {
  let component: ManageEnergyEquipmentComponent;
  let fixture: ComponentFixture<ManageEnergyEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageEnergyEquipmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEnergyEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
