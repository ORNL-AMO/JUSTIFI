import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveSummaryReportComponent } from './executive-summary-report.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { getNewIdbOnSiteVisit } from 'src/app/models/onSiteVisit';

describe('ExecutiveSummaryReportComponent', () => {
  let component: ExecutiveSummaryReportComponent;
  let fixture: ComponentFixture<ExecutiveSummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [ExecutiveSummaryReportComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveSummaryReportComponent);
    component = fixture.componentInstance;
    component.onSiteVisit = getNewIdbOnSiteVisit('123', '123', '123');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
