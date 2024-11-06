import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDetailsTableComponent } from './report-details-table.component';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { getNewIdbCompany, IdbCompany } from 'src/app/models/company';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { BehaviorSubject } from 'rxjs';
import { getNewIdbFacility, IdbFacility } from 'src/app/models/facility';
import { getNewIdbAssessment } from 'src/app/models/assessment';
import { getDefaultUnitSettings } from 'src/app/models/unitSettings';

describe('ReportDetailsTableComponent', () => {
  let component: ReportDetailsTableComponent;
  let fixture: ComponentFixture<ReportDetailsTableComponent>;

  let companyIdbService: Partial<CompanyIdbService> = {
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany('')),
    getByGUID: () => { return getNewIdbCompany('') }
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', '')),
    getByGUID: () => { return getNewIdbFacility('', '') }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportDetailsTableComponent],
      providers: [
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReportDetailsTableComponent);
    component = fixture.componentInstance;
    component.assessment = getNewIdbAssessment('', '', '', getDefaultUnitSettings());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
