import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelAssessmentResultsComponent } from './side-panel-assessment-results.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { getNewIdbAssessment } from 'src/app/models/assessment';
import { getDefaultUnitSettings } from 'src/app/models/unitSettings';

describe('SidePanelAssessmentResultsComponent', () => {
  let component: SidePanelAssessmentResultsComponent;
  let fixture: ComponentFixture<SidePanelAssessmentResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidePanelAssessmentResultsComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidePanelAssessmentResultsComponent);
    component = fixture.componentInstance;
    component.assessment = getNewIdbAssessment('123', '123', '123', getDefaultUnitSettings())
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
