import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentEnergyOpportunitiesFormComponent } from './assessment-energy-opportunities-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NebFormsAccordionComponent } from '../../../../shared/shared-assessment-forms/neb-forms-accordion/neb-forms-accordion.component';
import { EnergyOpportunitySetupFormComponent } from 'src/app/shared/shared-assessment-forms/energy-opportunity-setup-form/energy-opportunity-setup-form.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { AssociatedEnergyEquipmentModule } from 'src/app/shared/associated-energy-equipment/associated-energy-equipment.module';
import { AssociatedProcessEquipmentModule } from 'src/app/shared/associated-process-equipment/associated-process-equipment.module';

describe('AssessmentEnergyOpportunitiesFormComponent', () => {
  let component: AssessmentEnergyOpportunitiesFormComponent;
  let fixture: ComponentFixture<AssessmentEnergyOpportunitiesFormComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule, FormsModule, HelperPipesModule, AssociatedEnergyEquipmentModule, AssociatedProcessEquipmentModule],
      declarations: [AssessmentEnergyOpportunitiesFormComponent, EnergyOpportunitySetupFormComponent, NebFormsAccordionComponent],
      providers: stubServiceProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentEnergyOpportunitiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
