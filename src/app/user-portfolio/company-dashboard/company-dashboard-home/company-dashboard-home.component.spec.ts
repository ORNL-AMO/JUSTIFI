import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashboardHomeComponent } from './company-dashboard-home.component';
import { CompanyListItemComponent } from '../../portfolio-items-list/company-list-item/company-list-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { FacilityListItemComponent } from '../../portfolio-items-list/facility-list-item/facility-list-item.component';
import { AssessmentListItemComponent } from '../../portfolio-items-list/assessment-list-item/assessment-list-item.component';

describe('CompanyDashboardHomeComponent', () => {
  let component: CompanyDashboardHomeComponent;
  let fixture: ComponentFixture<CompanyDashboardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule, HelperPipesModule],
      declarations: [CompanyDashboardHomeComponent, CompanyListItemComponent, FacilityListItemComponent, AssessmentListItemComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
