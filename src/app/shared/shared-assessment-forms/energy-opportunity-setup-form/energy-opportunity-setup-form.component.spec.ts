import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyOpportunitySetupFormComponent } from './energy-opportunity-setup-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NebFormsAccordionComponent } from '../neb-forms-accordion/neb-forms-accordion.component';
import { AssociatedProcessEquipmentModule } from '../../associated-process-equipment/associated-process-equipment.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('EnergyOpportunitySetupFormComponent', () => {
  let component: EnergyOpportunitySetupFormComponent;
  let fixture: ComponentFixture<EnergyOpportunitySetupFormComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule, FormsModule, AssociatedProcessEquipmentModule],
      declarations: [EnergyOpportunitySetupFormComponent, NebFormsAccordionComponent],
      providers: stubServiceProviders

    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergyOpportunitySetupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
