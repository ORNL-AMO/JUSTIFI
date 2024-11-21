import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCollectionManageAssessmentsComponent } from './data-collection-manage-assessments.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit, getNewIdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { BehaviorSubject } from 'rxjs';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';

describe('DataCollectionManageAssessmentsComponent', () => {
  let component: DataCollectionManageAssessmentsComponent;
  let fixture: ComponentFixture<DataCollectionManageAssessmentsComponent>;

  let assessmentIdbService: Partial<AssessmentIdbService> = {
    assessments: new BehaviorSubject<Array<IdbAssessment>>([])
  };
  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {
    selectedVisit: new BehaviorSubject<IdbOnSiteVisit>(getNewIdbOnSiteVisit('', '', ''))
  };
  let dbChangesService: Partial<DbChangesService> = {};
  let facilityIdbService: Partial<FacilityIdbService> = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, FontAwesomeModule, HelperPipesModule],
      declarations: [DataCollectionManageAssessmentsComponent],
      providers: [
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
        { provide: DbChangesService, useValue: dbChangesService },
        { provide: FacilityIdbService, useValue: facilityIdbService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataCollectionManageAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
