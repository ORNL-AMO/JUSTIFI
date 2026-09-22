import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardModalComponent } from './setup-wizard-modal.component';
import { FormsModule } from '@angular/forms';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { RouterTestingModule } from '@angular/router/testing';
import { IdbAssessment } from 'src/app/models/assessment';
import { getNewIdbOnSiteVisit, IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { Router } from '@angular/router';

describe('SetupWizardModalComponent', () => {
  let component: SetupWizardModalComponent;
  let fixture: ComponentFixture<SetupWizardModalComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HelperPipesModule, RouterTestingModule],
      declarations: [SetupWizardModalComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(SetupWizardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should identify visits by their associated assessment names', () => {
    component.selectedCompanyGuid = '123';
    component.selectedFacilityGuid = '123';
    component.assessments = [
      { guid: 'boiler-assessment', name: 'Boiler 1 Assessment' } as IdbAssessment,
      { guid: 'air-assessment', name: 'Air Assessment' } as IdbAssessment
    ];
    component.onSiteVisits = [
      getVisit('woodruff-visit', ['boiler-assessment']),
      getVisit('roasting-visit', ['air-assessment']),
      getVisit('empty-visit', []),
      getVisit('stale-visit', ['missing-assessment'])
    ];

    fixture.detectChanges();

    const optionText = Array.from(
      fixture.nativeElement.querySelectorAll('#selectedVisit option')
    ).map((option: HTMLOptionElement) => option.textContent.replace(/\s+/g, ' ').trim());
    expect(optionText.some(text => text.includes('Boiler 1 Assessment'))).toBeTrue();
    expect(optionText.some(text => text.includes('Air Assessment'))).toBeTrue();
    expect(optionText.filter(text => text.includes('No assessments found')).length).toBe(2);
  });

  it('should navigate to data collection for the selected visit guid', async () => {
    const visit = getVisit('woodruff-visit', ['boiler-assessment']);
    const onSiteVisitIdbService = TestBed.inject(OnSiteVisitIdbService);
    const router = TestBed.inject(Router);
    onSiteVisitIdbService.getByGuid = jasmine.createSpy('getByGuid').and.returnValue(visit);
    const navigateSpy = spyOn(router, 'navigateByUrl').and.resolveTo(true);
    component.selectedCompanyGuid = '123';
    component.selectedFacilityGuid = '123';
    component.selectedOnSiteVisitGuid = visit.guid;
    component.setupWizardSection = 'dataCollection';

    await component.confirmCreate();

    expect(onSiteVisitIdbService.getByGuid).toHaveBeenCalledOnceWith('woodruff-visit');
    expect(navigateSpy).toHaveBeenCalledOnceWith(
      '/setup-wizard/data-collection/woodruff-visit/assessment/boiler-assessment'
    );
  });

  function getVisit(guid: string, assessmentIds: Array<string>): IdbOnSiteVisit {
    const visit = getNewIdbOnSiteVisit('123', '123', '123');
    visit.guid = guid;
    visit.assessmentIds = assessmentIds;
    return visit;
  }
});
