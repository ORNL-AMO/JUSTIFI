import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentListItemComponent } from './assessment-list-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { getNewIdbAssessment } from 'src/app/models/assessment';
import { getDefaultUnitSettings } from 'src/app/models/unitSettings';

describe('AssessmentListItemComponent', () => {
  let component: AssessmentListItemComponent;
  let fixture: ComponentFixture<AssessmentListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule],
      declarations: [AssessmentListItemComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssessmentListItemComponent);
    component = fixture.componentInstance;
    component.assessment = getNewIdbAssessment('123', '123', '123', getDefaultUnitSettings());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
