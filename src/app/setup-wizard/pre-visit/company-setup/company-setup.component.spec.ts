import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySetupComponent } from './company-setup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser, getNewIdbUser } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
import { SetupWizardService } from '../../setup-wizard.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { SharedSettingsFormsModule } from 'src/app/shared/shared-settings-forms/shared-settings-forms.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit, getNewIdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { LabelWithTooltipModule } from 'src/app/shared/label-with-tooltip/label-with-tooltip.module';
import { PreAssessmentSetupService } from '../pre-assessment-setup/pre-assessment-setup.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';

describe('CompanySetupComponent', () => {
  let component: CompanySetupComponent;
  let fixture: ComponentFixture<CompanySetupComponent>;
  let userIdbService: Partial<UserIdbService> = {
    user: new BehaviorSubject<IdbUser>(getNewIdbUser())
  }
  let setupWizardService: Partial<SetupWizardService> = {
  };
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([]),
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', '')),
    getByOtherGuid: (guid, idType) => []
  };
  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {
    selectedVisit: new BehaviorSubject<IdbOnSiteVisit>(getNewIdbOnSiteVisit('', '', ''))
  };
  let preAassessmentSetupService: Partial<PreAssessmentSetupService> = {};
  let assessmentIdbService: Partial<AssessmentIdbService> = {
    getByOtherGuid: (guid, idType) => []
  };

  let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {
    getByOtherGuid: (guid, idType) => []
  };

  let energyEquipmentIdbService: Partial<EnergyEquipmentIdbService> = {
    getByOtherGuid: (guid, idType) => []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, SharedSettingsFormsModule, FormsModule, ReactiveFormsModule, LabelWithTooltipModule],
      declarations: [CompanySetupComponent],
      providers: [
        { provide: UserIdbService, useValue: userIdbService },
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
        { provide: PreAssessmentSetupService, useValue: preAassessmentSetupService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
        { provide: EnergyEquipmentIdbService, useValue: energyEquipmentIdbService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompanySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
