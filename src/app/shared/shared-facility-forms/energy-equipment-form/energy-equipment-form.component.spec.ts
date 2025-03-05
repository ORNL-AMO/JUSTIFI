import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyEquipmentFormComponent } from './energy-equipment-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { FormsModule } from '@angular/forms';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { AssociatedContactsModule } from '../../associated-contacts/associated-contacts.module';
import { AssociatedEnergyEquipmentModule } from '../../associated-energy-equipment/associated-energy-equipment.module';
import { AssociatedProcessEquipmentModule } from '../../associated-process-equipment/associated-process-equipment.module';
import { DiscoveryEnergyEquipmentQuestionsComponent } from '../discovery-energy-equipment-questions/discovery-energy-equipment-questions.component';
import { EnergyEquipmentOperationsComponent } from '../discovery-energy-equipment-questions/energy-equipment-operations/energy-equipment-operations.component';
import { EnergyEquipmentSustainabilityComponent } from '../discovery-energy-equipment-questions/energy-equipment-sustainability/energy-equipment-sustainability.component';
import { EnergyEquipmentEmployeeEngagementComponent } from '../discovery-energy-equipment-questions/energy-equipment-employee-engagement/energy-equipment-employee-engagement.component';
import { EnergyEquipmentTakeStockComponent } from '../discovery-energy-equipment-questions/energy-equipment-take-stock/energy-equipment-take-stock.component';

describe('EnergyEquipmentFormComponent', () => {
  let component: EnergyEquipmentFormComponent;
  let fixture: ComponentFixture<EnergyEquipmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule, FormsModule, AssociatedContactsModule, AssociatedEnergyEquipmentModule, AssociatedProcessEquipmentModule],
      declarations: [EnergyEquipmentFormComponent, DiscoveryEnergyEquipmentQuestionsComponent, EnergyEquipmentOperationsComponent, EnergyEquipmentSustainabilityComponent, EnergyEquipmentEmployeeEngagementComponent, EnergyEquipmentTakeStockComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(EnergyEquipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
