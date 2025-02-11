import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentSavingsTableComponent } from './assessment-savings-table.component';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { getAssessmentReport } from '../../calculations/assessmentReport';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { getDefaultUnitSettings } from 'src/app/models/unitSettings';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';

describe('AssessmentSavingsTableComponent', () => {
  let component: AssessmentSavingsTableComponent;
  let fixture: ComponentFixture<AssessmentSavingsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableEntriesModule, FontAwesomeModule, HelperPipesModule],
      declarations: [AssessmentSavingsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentSavingsTableComponent);
    component = fixture.componentInstance;
    let assessment: IdbAssessment = getNewIdbAssessment('', '', '', getDefaultUnitSettings());
    component.assessmentReport = getAssessmentReport(assessment, [], [], [], []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
