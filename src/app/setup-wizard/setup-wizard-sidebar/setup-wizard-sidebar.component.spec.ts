import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardSidebarComponent } from './setup-wizard-sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SetupWizardService } from '../setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbOnSiteVisit, getNewIdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';

describe('SetupWizardSidebarComponent', () => {
  let component: SetupWizardSidebarComponent;
  let fixture: ComponentFixture<SetupWizardSidebarComponent>;

  let setupWizardService: Partial<SetupWizardService> = {
    sidebarOpen: new BehaviorSubject<boolean>(true),
    helpPanelOpen: new BehaviorSubject<boolean>(true)
  };
  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {
    selectedVisit: new BehaviorSubject<IdbOnSiteVisit>(getNewIdbOnSiteVisit('', '', ''))
  };
  let assessmentIdbService: Partial<AssessmentIdbService> = {
    assessments: new BehaviorSubject<Array<IdbAssessment>>([])
  };
  let companyIdbService: Partial<CompanyIdbService> = {
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  let keyPerformanceIndicatorService: Partial<KeyPerformanceIndicatorsIdbService> = {
    keyPerformanceIndicators: new BehaviorSubject<Array<IdbKeyPerformanceIndicator>>([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule, HelperPipesModule],
      declarations: [SetupWizardSidebarComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorService },
        { provide: CompanyIdbService, useValue: companyIdbService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SetupWizardSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
