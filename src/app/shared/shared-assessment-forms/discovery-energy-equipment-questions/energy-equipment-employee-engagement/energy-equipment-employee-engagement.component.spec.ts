import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyEquipmentEmployeeEngagementComponent } from './energy-equipment-employee-engagement.component';

describe('EnergyEquipmentEmployeeEngagementComponent', () => {
  let component: EnergyEquipmentEmployeeEngagementComponent;
  let fixture: ComponentFixture<EnergyEquipmentEmployeeEngagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnergyEquipmentEmployeeEngagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyEquipmentEmployeeEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
