import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListItemComponent } from './company-list-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FacilityListItemComponent } from '../facility-list-item/facility-list-item.component';
import { AssessmentListItemComponent } from '../assessment-list-item/assessment-list-item.component';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { getNewIdbCompany } from 'src/app/models/company';

describe('CompanyListItemComponent', () => {
  let component: CompanyListItemComponent;
  let fixture: ComponentFixture<CompanyListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule],
      declarations: [CompanyListItemComponent, FacilityListItemComponent, AssessmentListItemComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyListItemComponent);
    component = fixture.componentInstance;
    component.company = getNewIdbCompany('123');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
