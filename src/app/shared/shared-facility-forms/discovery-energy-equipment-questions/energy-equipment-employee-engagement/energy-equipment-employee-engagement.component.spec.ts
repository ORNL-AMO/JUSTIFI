import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyEquipmentEmployeeEngagementComponent } from './energy-equipment-employee-engagement.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('EnergyEquipmentEmployeeEngagementComponent', () => {
  let component: EnergyEquipmentEmployeeEngagementComponent;
  let fixture: ComponentFixture<EnergyEquipmentEmployeeEngagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, FontAwesomeModule],
      declarations: [EnergyEquipmentEmployeeEngagementComponent],
      providers: stubServiceProviders
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
