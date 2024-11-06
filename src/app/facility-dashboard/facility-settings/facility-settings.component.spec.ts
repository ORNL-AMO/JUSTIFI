import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitySettingsComponent } from './facility-settings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedSettingsFormsModule } from 'src/app/shared/shared-settings-forms/shared-settings-forms.module';
import { FormsModule } from '@angular/forms';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { BehaviorSubject } from 'rxjs';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { LocalStorageDataService } from 'src/app/shared/shared-services/local-storage-data.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { PreAssessmentSetupService } from 'src/app/setup-wizard/pre-visit/pre-assessment-setup/pre-assessment-setup.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';

describe('FacilitySettingsComponent', () => {
  let component: FacilitySettingsComponent;
  let fixture: ComponentFixture<FacilitySettingsComponent>;
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([]),
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };
  let userIdbService: Partial<UserIdbService> = {};
  let onsiteVisitIdbService: Partial<OnSiteVisitIdbService> = {};
  let preAassessmentSetupService: Partial<PreAssessmentSetupService> = {};
  let assessmentIdbService: Partial<AssessmentIdbService> = {};
  let energyEquipmentIdbService: Partial<EnergyEquipmentIdbService> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, SharedSettingsFormsModule, FormsModule],
      declarations: [FacilitySettingsComponent],
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: LocalStorageDataService, useValue: {}},
        { provide: DbChangesService, useValue: {}},
        { provide: UserIdbService, useValue: userIdbService},
        { provide: OnSiteVisitIdbService, useValue: onsiteVisitIdbService},
        { provide: PreAssessmentSetupService, useValue: preAassessmentSetupService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: EnergyEquipmentIdbService, useValue: energyEquipmentIdbService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacilitySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
