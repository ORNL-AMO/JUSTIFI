import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDashboardHomeComponent } from './assessment-dashboard-home.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { AssessmentListItemComponent } from '../../portfolio-items-list/assessment-list-item/assessment-list-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';

describe('AssessmentDashboardHomeComponent', () => {
  let component: AssessmentDashboardHomeComponent;
  let fixture: ComponentFixture<AssessmentDashboardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule],
      declarations: [AssessmentDashboardHomeComponent, AssessmentListItemComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
