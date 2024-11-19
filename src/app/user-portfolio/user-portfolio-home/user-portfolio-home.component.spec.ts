import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPortfolioHomeComponent } from './user-portfolio-home.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { PortfolioItemsListComponent } from '../portfolio-items-list/portfolio-items-list.component';
import { LatestVisitsTableComponent } from '../latest-visits-table/latest-visits-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { CompanyListItemComponent } from '../portfolio-items-list/company-list-item/company-list-item.component';
import { FacilityListItemComponent } from '../portfolio-items-list/facility-list-item/facility-list-item.component';
import { AssessmentListItemComponent } from '../portfolio-items-list/assessment-list-item/assessment-list-item.component';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { TablePaginationModule } from 'src/app/shared/table-pagination/table-pagination.module';

describe('UserPortfolioHomeComponent', () => {
  let component: UserPortfolioHomeComponent;
  let fixture: ComponentFixture<UserPortfolioHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule, HelperPipesModule, TablePaginationModule],
      declarations: [UserPortfolioHomeComponent, PortfolioItemsListComponent, LatestVisitsTableComponent, CompanyListItemComponent, AssessmentListItemComponent, FacilityListItemComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPortfolioHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
