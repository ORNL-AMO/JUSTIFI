import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnSiteVisitSavingsChartComponent } from './on-site-visit-savings-chart.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { getOnSiteVisitReport } from '../../calculations/visitReport';

describe('OnSiteVisitSavingsChartComponent', () => {
  let component: OnSiteVisitSavingsChartComponent;
  let fixture: ComponentFixture<OnSiteVisitSavingsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnSiteVisitSavingsChartComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(OnSiteVisitSavingsChartComponent);
    component = fixture.componentInstance;
    component.onSiteVisitReport = getOnSiteVisitReport([], [], [], [], [], []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
