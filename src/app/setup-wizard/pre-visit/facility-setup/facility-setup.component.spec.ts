import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitySetupComponent } from './facility-setup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedSettingsFormsModule } from 'src/app/shared/shared-settings-forms/shared-settings-forms.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { SetupWizardService } from '../../setup-wizard.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbUser, getNewIdbUser } from 'src/app/models/user';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit, getNewIdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { PreAssessmentSetupService } from '../pre-assessment-setup/pre-assessment-setup.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyEquipmentDisplayPipe } from 'src/app/shared/helper-pipes/energy-equipment-display.pipe';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';

describe('FacilitySetupComponent', () => {
  let component: FacilitySetupComponent;
  let fixture: ComponentFixture<FacilitySetupComponent>;
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
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };

  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {
    selectedVisit: new BehaviorSubject<IdbOnSiteVisit>(getNewIdbOnSiteVisit('', '', ''))
  };

  let preAassessmentSetupService: Partial<PreAssessmentSetupService> = {};
  let assessmentIdbService: Partial<AssessmentIdbService> = {};

  let energyEquipmentIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, SharedSettingsFormsModule, FormsModule, ReactiveFormsModule],
      declarations: [FacilitySetupComponent],
      providers: [
        { provide: UserIdbService, useValue: userIdbService },
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: CompanyIdbService, useValue: companyIdbService },   
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
        { provide: PreAssessmentSetupService, useValue: preAassessmentSetupService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: EnergyEquipmentIdbService, useValue: energyEquipmentIdbService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacilitySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
