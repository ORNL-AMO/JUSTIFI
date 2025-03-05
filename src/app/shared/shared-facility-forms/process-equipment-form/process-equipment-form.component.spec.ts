import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEquipmentFormComponent } from './process-equipment-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { AssociatedContactsModule } from '../../associated-contacts/associated-contacts.module';
import { AssociatedEnergyEquipmentModule } from '../../associated-energy-equipment/associated-energy-equipment.module';
import { DiscoveryProcessEquipmentQuestionsComponent } from '../discovery-process-equipment-questions/discovery-process-equipment-questions.component';
import { ProcessEquipmentEmployeeEngagementComponent } from '../discovery-process-equipment-questions/process-equipment-employee-engagement/process-equipment-employee-engagement.component';
import { ProcessEquipmentOperationsComponent } from '../discovery-process-equipment-questions/process-equipment-operations/process-equipment-operations.component';
import { ProcessEquipmentSustainablityComponent } from '../discovery-process-equipment-questions/process-equipment-sustainablity/process-equipment-sustainablity.component';
import { ProcessEquipmentTakeStockComponent } from '../discovery-process-equipment-questions/process-equipment-take-stock/process-equipment-take-stock.component';

describe('ProcessEquipmentFormComponent', () => {
  let component: ProcessEquipmentFormComponent;
  let fixture: ComponentFixture<ProcessEquipmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule, FormsModule, AssociatedContactsModule, AssociatedEnergyEquipmentModule],
      declarations: [ProcessEquipmentFormComponent, DiscoveryProcessEquipmentQuestionsComponent, ProcessEquipmentEmployeeEngagementComponent, ProcessEquipmentOperationsComponent, ProcessEquipmentSustainablityComponent, ProcessEquipmentTakeStockComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProcessEquipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
