import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentEnergyOpportunitiesHomeComponent } from './assessment-energy-opportunities-home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';

describe('AssessmentEnergyOpportunitiesHomeComponent', () => {
  let component: AssessmentEnergyOpportunitiesHomeComponent;
  let fixture: ComponentFixture<AssessmentEnergyOpportunitiesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule, HelperPipesModule, TableEntriesModule],
      declarations: [AssessmentEnergyOpportunitiesHomeComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentEnergyOpportunitiesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
