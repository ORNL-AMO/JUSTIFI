import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDashboardHomeComponent } from './facility-dashboard-home.component';
import { FacilityListItemComponent } from '../../portfolio-items-list/facility-list-item/facility-list-item.component';
import { AssessmentListItemComponent } from '../../portfolio-items-list/assessment-list-item/assessment-list-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('FacilityDashboardHomeComponent', () => {
  let component: FacilityDashboardHomeComponent;
  let fixture: ComponentFixture<FacilityDashboardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule],
      declarations: [FacilityDashboardHomeComponent, FacilityListItemComponent, AssessmentListItemComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
