import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreAssessmentSummaryComponent } from './pre-assessment-summary.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('PreAssessmentSummaryComponent', () => {
  let component: PreAssessmentSummaryComponent;
  let fixture: ComponentFixture<PreAssessmentSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FontAwesomeModule, HelperPipesModule, TableEntriesModule],
      declarations: [PreAssessmentSummaryComponent],
      providers: stubServiceProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreAssessmentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
