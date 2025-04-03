import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentItemSavingsBarChartComponent } from './assessment-item-savings-bar-chart.component';

describe('AssessmentItemSavingsBarChartComponent', () => {
  let component: AssessmentItemSavingsBarChartComponent;
  let fixture: ComponentFixture<AssessmentItemSavingsBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentItemSavingsBarChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentItemSavingsBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
