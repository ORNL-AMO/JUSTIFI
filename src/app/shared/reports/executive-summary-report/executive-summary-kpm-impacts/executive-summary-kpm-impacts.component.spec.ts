import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveSummaryKpmImpactsComponent } from './executive-summary-kpm-impacts.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { CurrencySymbolPipe } from 'src/app/shared/helper-pipes/currency-symbol.pipe';
import { CurrencyPipe } from '@angular/common';
import { ExecutiveSummaryReport, getExecutiveSummaryReport } from '../../calculations/executiveSummaryReport';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';

describe('ExecutiveSummaryKpmImpactsComponent', () => {
  let component: ExecutiveSummaryKpmImpactsComponent;
  let fixture: ComponentFixture<ExecutiveSummaryKpmImpactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TableEntriesModule,
        HelperPipesModule,
      ],
      declarations: [
        ExecutiveSummaryKpmImpactsComponent,
        CurrencySymbolPipe,
      ],
      providers: [
        ...stubServiceProviders,
        CurrencyPipe,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveSummaryKpmImpactsComponent);
    component = fixture.componentInstance;
    component.executiveSummaryReport = getExecutiveSummaryReport(new Date(), [], [], [], [], [], [], []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
