import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbUser, getNewIdbUser } from 'src/app/models/user';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { BackupDataService } from 'src/app/shared/shared-services/backup-data.service';
import { ToastNotificationsService } from '../toast-notifications/toast-notifications.service';
import { LoadingService } from '../loading/loading.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let userIdbService: Partial<UserIdbService> = {
    user: new BehaviorSubject<IdbUser>(getNewIdbUser())
  }

  let sharedDataService: Partial<SharedDataService> = {};
  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {
    onSiteVisits: new BehaviorSubject([])
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject([])
  };
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject([])
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule, FormsModule],
      declarations: [WelcomeComponent],
      providers: [
        { provide: UserIdbService, useValue: userIdbService },
        { provide: SharedDataService, useValue: sharedDataService },
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: BackupDataService, useValue: {}},
        { provide: ToastNotificationsService, useValue: {}},
        { provide: LoadingService, useValue: {}},
        { provide: EnergyOpportunityIdbService, useValue: {}},
        { provide: AssessmentIdbService, useValue: {}},
        { provide: ContactIdbService, useValue: {}},
        { provide: NonEnergyBenefitsIdbService, useValue: {}},
        { provide: KeyPerformanceIndicatorsIdbService, useValue: {}},
        { provide: EnergyEquipmentIdbService, useValue: {}},
        { provide: ProcessEquipmentIdbService, useValue: {}},
        { provide: KeyPerformanceMetricImpactsIdbService, useValue: {}}
      ]
    });
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
