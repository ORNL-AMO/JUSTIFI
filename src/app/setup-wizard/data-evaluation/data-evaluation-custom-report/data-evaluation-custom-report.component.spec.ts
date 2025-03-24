import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEvaluationCustomReportComponent } from './data-evaluation-custom-report.component';

describe('DataEvaluationCustomReportComponent', () => {
  let component: DataEvaluationCustomReportComponent;
  let fixture: ComponentFixture<DataEvaluationCustomReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataEvaluationCustomReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataEvaluationCustomReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
