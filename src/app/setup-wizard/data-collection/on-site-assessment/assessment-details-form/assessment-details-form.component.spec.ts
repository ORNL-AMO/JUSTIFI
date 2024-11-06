import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDetailsFormComponent } from './assessment-details-form.component';
import { BehaviorSubject } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { ContactContext, IdbContact } from 'src/app/models/contact';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { getDefaultUnitSettings } from 'src/app/models/unitSettings';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';

describe('AssessmentDetailsFormComponent', () => {
  let component: AssessmentDetailsFormComponent;
  let fixture: ComponentFixture<AssessmentDetailsFormComponent>;

  let facilityIdbService: Partial<FacilityIdbService> = {
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };
  let assessmentIdbService: Partial<AssessmentIdbService> = {
    selectedAssessment: new BehaviorSubject<IdbAssessment>(getNewIdbAssessment('', '', '', getDefaultUnitSettings()))
  };
  let setupWizardService: Partial<SetupWizardService> = {
    sidebarOpen: new BehaviorSubject<boolean>(false),
    displayAddNebsModal: new BehaviorSubject<{
      assessmentId: string,
      energyOpportunityId: string
    }>(undefined),

    displayContactModal: new BehaviorSubject<{
      context: ContactContext,
      viewContact: IdbContact,
      contextGuid: string
    }>(undefined)
  };
  let contactIdbService: Partial<ContactIdbService> = {
    contacts: new BehaviorSubject<Array<IdbContact>>([])
  };

  let energyEquipmentIdbService: Partial<EnergyEquipmentIdbService> = {
    energyEquipments: new BehaviorSubject<Array<IdbEnergyEquipment>>([])
  };

  let companyIdbService: Partial<CompanyIdbService> = {
    selectedCompany: new BehaviorSubject<IdbCompany>(null)
  };

  let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, RouterTestingModule, HelperPipesModule],
      declarations: [AssessmentDetailsFormComponent],
      providers: [
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: EnergyEquipmentIdbService, useValue: energyEquipmentIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssessmentDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
