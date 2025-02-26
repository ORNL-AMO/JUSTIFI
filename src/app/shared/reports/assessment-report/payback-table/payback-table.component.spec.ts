import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaybackTableComponent } from './payback-table.component';
import { getAssessmentReport } from '../../calculations/assessmentReport';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';
import { getDefaultUnitSettings } from 'src/app/models/unitSettings';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';

describe('PaybackTableComponent', () => {
  let component: PaybackTableComponent;
  let fixture: ComponentFixture<PaybackTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableEntriesModule, HelperPipesModule],
      declarations: [PaybackTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaybackTableComponent);
    component = fixture.componentInstance;
    let assessment: IdbAssessment = getNewIdbAssessment('', '', '', getDefaultUnitSettings());
    component.assessmentReport = getAssessmentReport(assessment, [], [], [], []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
