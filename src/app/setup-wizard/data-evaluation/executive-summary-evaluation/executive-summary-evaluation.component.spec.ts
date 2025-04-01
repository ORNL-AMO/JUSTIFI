import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveSummaryEvaluationComponent } from './executive-summary-evaluation.component';

describe('ExecutiveSummaryEvaluationComponent', () => {
  let component: ExecutiveSummaryEvaluationComponent;
  let fixture: ComponentFixture<ExecutiveSummaryEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExecutiveSummaryEvaluationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveSummaryEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
