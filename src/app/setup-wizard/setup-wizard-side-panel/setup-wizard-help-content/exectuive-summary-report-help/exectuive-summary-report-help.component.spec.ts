import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExectuiveSummaryReportHelpComponent } from './exectuive-summary-report-help.component';

describe('ExectuiveSummaryReportHelpComponent', () => {
  let component: ExectuiveSummaryReportHelpComponent;
  let fixture: ComponentFixture<ExectuiveSummaryReportHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExectuiveSummaryReportHelpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExectuiveSummaryReportHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
