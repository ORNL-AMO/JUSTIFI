import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEvaluationCustomReportComponent } from './data-evaluation-custom-report.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('DataEvaluationCustomReportComponent', () => {
  let component: DataEvaluationCustomReportComponent;
  let fixture: ComponentFixture<DataEvaluationCustomReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule, FontAwesomeModule],
      declarations: [DataEvaluationCustomReportComponent],
      providers: stubServiceProviders
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
