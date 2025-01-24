import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnSiteAssessmentResultsComponent } from './on-site-assessment-results.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { ReportsModule } from 'src/app/shared/reports/reports.module';
import { SharedAssessmentFormsModule } from 'src/app/shared/shared-assessment-forms/shared-assessment-forms.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';


describe('OnSiteAssessmentResultsComponent', () => {
  let component: OnSiteAssessmentResultsComponent;
  let fixture: ComponentFixture<OnSiteAssessmentResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule, TableEntriesModule, HelperPipesModule, ReportsModule, SharedAssessmentFormsModule],
      declarations: [OnSiteAssessmentResultsComponent],
      providers: stubServiceProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnSiteAssessmentResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
