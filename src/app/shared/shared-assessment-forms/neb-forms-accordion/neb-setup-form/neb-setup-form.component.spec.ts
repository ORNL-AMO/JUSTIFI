import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NebSetupFormComponent } from './neb-setup-form.component';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IdbNonEnergyBenefit, getNewIdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { FormsModule } from '@angular/forms';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';
import { IdbContact } from 'src/app/models/contact';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { PerformanceMetricsModalComponent } from './performance-metrics-modal/performance-metrics-modal.component';
import { PerformanceMetricImpactFormComponent } from './performance-metric-impact-form/performance-metric-impact-form.component';

describe('NebSetupFormComponent', () => {
  let component: NebSetupFormComponent;
  let fixture: ComponentFixture<NebSetupFormComponent>;

  let setupWizardService: Partial<SetupWizardService> = {
    sidebarOpen: new BehaviorSubject<boolean>(false),
  };
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {
    energyOpportunities: new BehaviorSubject<Array<IdbEnergyOpportunity>>([])
  };
  let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {
    nonEnergyBenefits: new BehaviorSubject<Array<IdbNonEnergyBenefit>>([]),
    getByGuid: () => { return getNewIdbNonEnergyBenefit('', '', '', '', undefined, undefined, false) }
  };
  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {};
  let keyPerformanceIndicatorIdbService: Partial<KeyPerformanceIndicatorsIdbService> = {};
  let contactsIdbService: Partial<ContactIdbService> = {
    contacts: new BehaviorSubject<Array<IdbContact>>([])
  };
  let keyPerformanceMetricImpactsIdbService: Partial<KeyPerformanceMetricImpactsIdbService> = {
    keyPerformanceMetricImpacts: new BehaviorSubject<Array<IdbKeyPerformanceMetricImpact>>([])
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, HelperPipesModule],
      declarations: [NebSetupFormComponent, PerformanceMetricsModalComponent, PerformanceMetricImpactFormComponent ],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
        { provide: DbChangesService, useValue: {} },
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorIdbService },
        { provide: ContactIdbService, useValue: contactsIdbService },
        { provide: KeyPerformanceMetricImpactsIdbService, useValue: keyPerformanceMetricImpactsIdbService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NebSetupFormComponent);
    component = fixture.componentInstance;
    component.nonEnergyBenefit = getNewIdbNonEnergyBenefit('', '', '', '', undefined, undefined, false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
