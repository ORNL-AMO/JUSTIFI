import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalSavingsMessageComponent } from './additional-savings-message.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableEntriesModule } from '../../table-entries/table-entries.module';
import { getAssessmentReport } from '../calculations/assessmentReport';
import { getNewIdbAssessment, IdbAssessment } from 'src/app/models/assessment';
import { getDefaultUnitSettings } from 'src/app/models/unitSettings';

describe('AdditionalSavingsMessageComponent', () => {
  let component: AdditionalSavingsMessageComponent;
  let fixture: ComponentFixture<AdditionalSavingsMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, TableEntriesModule],
      declarations: [AdditionalSavingsMessageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdditionalSavingsMessageComponent);
    component = fixture.componentInstance;
    component.context = 'assessment';
    let assessment: IdbAssessment = getNewIdbAssessment('', '', '', getDefaultUnitSettings());
    component.assessmentReport = getAssessmentReport(assessment, [], [], [], [], []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
