import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestVisitsTableComponent } from './latest-visits-table.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TablePaginationModule } from 'src/app/shared/table-pagination/table-pagination.module';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { RouterTestingModule } from '@angular/router/testing';
import { getNewIdbOnSiteVisit, IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

describe('LatestVisitsTableComponent', () => {
  let component: LatestVisitsTableComponent;
  let fixture: ComponentFixture<LatestVisitsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, TablePaginationModule, HelperPipesModule, RouterTestingModule],
      declarations: [LatestVisitsTableComponent],
      providers: stubServiceProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LatestVisitsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should move the most recently modified visit to the first page', () => {
    const olderVisit = getVisit('older-visit', '2025-01-01T00:00:00Z');
    const updatedVisit = getVisit('updated-visit', '2025-02-01T00:00:00Z');
    component.onSiteVisits = [olderVisit, updatedVisit];
    component.currentPageNumber = 2;

    component.sortVisits();

    expect(component.onSiteVisits[0].guid).toBe('updated-visit');
    expect(component.currentPageNumber).toBe(1);
  });

  function getVisit(guid: string, modifiedDate: string): IdbOnSiteVisit {
    const visit = getNewIdbOnSiteVisit('user-1', 'company-1', 'facility-1');
    visit.guid = guid;
    visit.modifiedDate = new Date(modifiedDate);
    return visit;
  }
});
