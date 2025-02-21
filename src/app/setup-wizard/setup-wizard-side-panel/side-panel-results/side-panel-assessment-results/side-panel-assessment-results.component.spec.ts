import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelAssessmentResultsComponent } from './side-panel-assessment-results.component';

describe('SidePanelAssessmentResultsComponent', () => {
  let component: SidePanelAssessmentResultsComponent;
  let fixture: ComponentFixture<SidePanelAssessmentResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidePanelAssessmentResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidePanelAssessmentResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
