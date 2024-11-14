import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioItemsListComponent } from './portfolio-items-list.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CompanyListItemComponent } from './company-list-item/company-list-item.component';
import { AssessmentListItemComponent } from './assessment-list-item/assessment-list-item.component';
import { FacilityListItemComponent } from './facility-list-item/facility-list-item.component';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';

describe('PortfolioItemsListComponent', () => {
  let component: PortfolioItemsListComponent;
  let fixture: ComponentFixture<PortfolioItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule],
      declarations: [PortfolioItemsListComponent, CompanyListItemComponent, AssessmentListItemComponent, FacilityListItemComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
