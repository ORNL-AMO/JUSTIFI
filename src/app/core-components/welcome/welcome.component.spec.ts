import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { IdbAssessment } from 'src/app/models/assessment';
import { getNewIdbOnSiteVisit, IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { Router } from '@angular/router';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule, FormsModule, HelperPipesModule],
      declarations: [WelcomeComponent],
      providers: stubServiceProviders
    });
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the assessments associated with each visit', () => {
    component.assessments = [
      { guid: 'boiler-assessment', name: 'Boiler 1 Assessment' } as IdbAssessment,
      { guid: 'air-assessment', name: 'Air Assessment' } as IdbAssessment
    ];
    component.onSiteVisits = [
      getVisit('woodruff-visit', ['boiler-assessment']),
      getVisit('roasting-visit', ['air-assessment'])
    ];

    fixture.detectChanges();

    const assessmentCells = Array.from(
      fixture.nativeElement.querySelectorAll('.visit-assessments')
    ) as Array<HTMLElement>;
    expect(assessmentCells.map(cell => cell.textContent.trim())).toEqual([
      'Boiler 1 Assessment',
      'Air Assessment'
    ]);
  });

  it('should show an empty state for visits with no matching assessments', () => {
    component.assessments = [];
    component.onSiteVisits = [
      getVisit('empty-visit', []),
      getVisit('stale-visit', ['missing-assessment'])
    ];

    fixture.detectChanges();

    const assessmentCells = Array.from(
      fixture.nativeElement.querySelectorAll('.visit-assessments')
    ) as Array<HTMLElement>;
    expect(assessmentCells.map(cell => cell.textContent.trim())).toEqual([
      'No assessments found',
      'No assessments found'
    ]);
  });

  it('should open the selected visit by its guid', () => {
    const visit = getVisit('woodruff-visit', ['boiler-assessment']);
    const companyIdbService = TestBed.inject(CompanyIdbService);
    const facilityIdbService = TestBed.inject(FacilityIdbService);
    const onSiteVisitIdbService = TestBed.inject(OnSiteVisitIdbService);
    const router = TestBed.inject(Router);
    companyIdbService.setSelectedFromGUID = jasmine.createSpy('setSelectedFromGUID').and.returnValue(true);
    facilityIdbService.setSelectedFromGUID = jasmine.createSpy('setSelectedFromGUID').and.returnValue(true);
    onSiteVisitIdbService.setSelectedFromGUID = jasmine.createSpy('setSelectedFromGUID').and.returnValue(true);
    const navigateSpy = spyOn(router, 'navigateByUrl').and.resolveTo(true);

    component.goToVisit(visit);

    expect(onSiteVisitIdbService.setSelectedFromGUID).toHaveBeenCalledOnceWith('woodruff-visit');
    expect(navigateSpy).toHaveBeenCalledOnceWith('/setup-wizard/pre-visit/woodruff-visit');
  });

  function getVisit(guid: string, assessmentIds: Array<string>): IdbOnSiteVisit {
    const visit = getNewIdbOnSiteVisit('123', '123', '123');
    visit.guid = guid;
    visit.assessmentIds = assessmentIds;
    return visit;
  }
});
