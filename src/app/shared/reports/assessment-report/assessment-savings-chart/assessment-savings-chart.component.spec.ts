import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentSavingsChartComponent } from './assessment-savings-chart.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('AssessmentSavingsChartComponent', () => {
  let component: AssessmentSavingsChartComponent;
  let fixture: ComponentFixture<AssessmentSavingsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentSavingsChartComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssessmentSavingsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
