import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNebsModalComponent } from './add-nebs-modal.component';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { getNewIdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { getDefaultUnitSettings } from 'src/app/models/unitSettings';
import { NebsDatabaseModule } from 'src/app/nebs-database/nebs-database.module';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { getNewIdbCompany, IdbCompany } from 'src/app/models/company';

describe('AddNebsModalComponent', () => {
  let component: AddNebsModalComponent;
  let fixture: ComponentFixture<AddNebsModalComponent>;



  let setupWizardService: Partial<SetupWizardService> = {
    sidebarOpen: new BehaviorSubject<boolean>(false)
  };
  let keyPerformanceIndicatorIdbService: Partial<KeyPerformanceIndicatorsIdbService> = {
    keyPerformanceIndicators: new BehaviorSubject<Array<IdbKeyPerformanceIndicator>>([]),
    getCompanyKeyPerformanceMetrics: () => { return [] },
    getByCompanyGuid: () => { return [] }
  };
  let nonEnergyBenefitIdbService: Partial<NonEnergyBenefitsIdbService> = {
    getAssessmentNonEnergyBenefits: () => { return [] }
  };
  let assessmentIdbService: Partial<AssessmentIdbService> = {
    selectedAssessment: new BehaviorSubject<IdbAssessment>(getNewIdbAssessment('', '', '', getDefaultUnitSettings())),
    getByGuid: () => { return getNewIdbAssessment('', '', '', getDefaultUnitSettings()) }

  };
  let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {
    getByGuid: () => { return getNewIdbEnergyOpportunity('', '', '', '', null) }

  };
  let keyPerformanceMetricImpactsIdbService: Partial<KeyPerformanceMetricImpactsIdbService> = {};
  let companyIdbService: Partial<CompanyIdbService> = {
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, NebsDatabaseModule],
      declarations: [AddNebsModalComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
        { provide: KeyPerformanceMetricImpactsIdbService, useValue: keyPerformanceMetricImpactsIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddNebsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
