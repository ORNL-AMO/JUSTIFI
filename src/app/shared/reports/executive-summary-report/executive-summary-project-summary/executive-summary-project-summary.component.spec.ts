import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveSummaryProjectSummaryComponent } from './executive-summary-project-summary.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { ExecutiveSummaryReport, getExecutiveSummaryReport } from '../../calculations/executiveSummaryReport';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';

describe('ExecutiveSummaryProjectSummaryComponent', () => {
  let component: ExecutiveSummaryProjectSummaryComponent;
  let fixture: ComponentFixture<ExecutiveSummaryProjectSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, TableEntriesModule, HelperPipesModule],
      declarations: [ExecutiveSummaryProjectSummaryComponent],
      providers: stubServiceProviders,
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveSummaryProjectSummaryComponent);
    component = fixture.componentInstance;
    component.executiveSummaryReport = getExecutiveSummaryReport(new Date(), [], [], [], [], [], [], []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
