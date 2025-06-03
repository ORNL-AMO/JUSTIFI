import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveSummaryReportComponent } from './executive-summary-report.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { getNewIdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { ExecutiveSummaryProjectSummaryComponent } from './executive-summary-project-summary/executive-summary-project-summary.component';
import { ExecutiveSummaryKpiImpactsComponent } from './executive-summary-kpi-impacts/executive-summary-kpi-impacts.component';
import { CurrencySymbolPipe } from '../../helper-pipes/currency-symbol.pipe';
import { TableEntriesModule } from '../../table-entries/table-entries.module';
import { HelperPipesModule } from '../../helper-pipes/_helper-pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('ExecutiveSummaryReportComponent', () => {
  let component: ExecutiveSummaryReportComponent;
  let fixture: ComponentFixture<ExecutiveSummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TableEntriesModule,
        HelperPipesModule,
        FontAwesomeModule
      ],
      declarations: [
        ExecutiveSummaryReportComponent,
        ExecutiveSummaryProjectSummaryComponent,
        ExecutiveSummaryKpiImpactsComponent,
      ],
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
