import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyKpisSummaryComponent } from './company-kpis-summary.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { BehaviorSubject } from 'rxjs';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';

describe('CompanyKpisSummaryComponent', () => {
  let component: CompanyKpisSummaryComponent;
  let fixture: ComponentFixture<CompanyKpisSummaryComponent>;


  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  let contactIdbService: Partial<ContactIdbService> = {
    contacts: new BehaviorSubject<Array<IdbContact>>([])
  };
  let keyPerformanceIndicatorIdbService: Partial<KeyPerformanceIndicatorsIdbService> = {
    keyPerformanceIndicators: new BehaviorSubject<Array<IdbKeyPerformanceIndicator>>([])
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FontAwesomeModule, HelperPipesModule],
      declarations: [CompanyKpisSummaryComponent],
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorIdbService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyKpisSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
