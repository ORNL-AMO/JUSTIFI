import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryEnergyEquipmentQuestionsComponent } from './discovery-energy-equipment-questions.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { EnergyEquipmentTakeStockComponent } from './energy-equipment-take-stock/energy-equipment-take-stock.component';
import { EnergyEquipmentSustainabilityComponent } from './energy-equipment-sustainability/energy-equipment-sustainability.component';
import { EnergyEquipmentOperationsComponent } from './energy-equipment-operations/energy-equipment-operations.component';
import { EnergyEquipmentEmployeeEngagementComponent } from './energy-equipment-employee-engagement/energy-equipment-employee-engagement.component';
import { FormsModule } from '@angular/forms';

describe('DiscoveryEnergyEquipmentQuestionsComponent', () => {
  let component: DiscoveryEnergyEquipmentQuestionsComponent;
  let fixture: ComponentFixture<DiscoveryEnergyEquipmentQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [DiscoveryEnergyEquipmentQuestionsComponent, EnergyEquipmentTakeStockComponent, EnergyEquipmentSustainabilityComponent, EnergyEquipmentOperationsComponent, EnergyEquipmentEmployeeEngagementComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(DiscoveryEnergyEquipmentQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
