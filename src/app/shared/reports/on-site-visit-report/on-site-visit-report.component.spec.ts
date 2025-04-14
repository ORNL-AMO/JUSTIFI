import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnSiteVisitReportComponent } from './on-site-visit-report.component';
import { getNewIdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from '../../helper-pipes/_helper-pipes.module';
import { PaybackTableComponent } from '../assessment-report/payback-table/payback-table.component';
import { AssessmentSavingsTableComponent } from '../assessment-report/assessment-savings-table/assessment-savings-table.component';
import { TableEntriesModule } from '../../table-entries/table-entries.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ReportDetailsTableComponent } from '../report-details-table/report-details-table.component';
import { PerformanceMetricsTableComponent } from '../performance-metrics-table/performance-metrics-table.component';
import { PerformanceMetricsChartComponent } from '../performance-metrics-chart/performance-metrics-chart.component';
import { OnSiteVisitPaybackTableComponent } from './on-site-visit-payback-table/on-site-visit-payback-table.component';
import { OnSiteVisitSavingsChartComponent } from './on-site-visit-savings-chart/on-site-visit-savings-chart.component';
import { NebContributionsBarChartComponent } from './neb-contributions-bar-chart/neb-contributions-bar-chart.component';
import { PerformanceMetricsTablePipe } from '../performance-metrics-table/performance-metrics-table.pipe';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { PaybackWaterfallChartComponent } from '../payback-waterfall-chart/payback-waterfall-chart.component';

describe('OnSiteVisitReportComponent', () => {
  let component: OnSiteVisitReportComponent;
  let fixture: ComponentFixture<OnSiteVisitReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule, TableEntriesModule, HelperPipesModule],
      declarations: [OnSiteVisitReportComponent, AssessmentSavingsTableComponent, PaybackTableComponent, ReportDetailsTableComponent, PerformanceMetricsTableComponent, PerformanceMetricsChartComponent,
        OnSiteVisitPaybackTableComponent, OnSiteVisitSavingsChartComponent, NebContributionsBarChartComponent, PerformanceMetricsTablePipe, PaybackWaterfallChartComponent
      ],
      providers: stubServiceProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnSiteVisitReportComponent);
    component = fixture.componentInstance;
    component.onSiteVisit = getNewIdbOnSiteVisit('', '', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
