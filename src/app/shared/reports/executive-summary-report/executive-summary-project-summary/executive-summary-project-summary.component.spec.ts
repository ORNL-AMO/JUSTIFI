import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveSummaryProjectSummaryComponent } from './executive-summary-project-summary.component';

describe('ExecutiveSummaryProjectSummaryComponent', () => {
  let component: ExecutiveSummaryProjectSummaryComponent;
  let fixture: ComponentFixture<ExecutiveSummaryProjectSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExecutiveSummaryProjectSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveSummaryProjectSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
