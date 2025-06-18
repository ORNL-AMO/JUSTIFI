import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryProcessEquipmentQuestionsComponent } from './discovery-process-equipment-questions.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ProcessEquipmentEmployeeEngagementComponent } from './process-equipment-employee-engagement/process-equipment-employee-engagement.component';
import { ProcessEquipmentOperationsComponent } from './process-equipment-operations/process-equipment-operations.component';
import { ProcessEquipmentSustainabilityComponent } from './process-equipment-sustainability/process-equipment-sustainability.component';
import { ProcessEquipmentTakeStockComponent } from './process-equipment-take-stock/process-equipment-take-stock.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('DiscoveryProcessEquipmentQuestionsComponent', () => {
  let component: DiscoveryProcessEquipmentQuestionsComponent;
  let fixture: ComponentFixture<DiscoveryProcessEquipmentQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [DiscoveryProcessEquipmentQuestionsComponent, ProcessEquipmentEmployeeEngagementComponent, ProcessEquipmentOperationsComponent, ProcessEquipmentSustainabilityComponent, ProcessEquipmentTakeStockComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoveryProcessEquipmentQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
