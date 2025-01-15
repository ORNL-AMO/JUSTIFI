import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactDetailsFormComponent } from './company-contact-details-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedCompanyFormsModule } from 'src/app/shared/shared-company-forms/shared-company-forms.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';

describe('CompanyContactDetailsFormComponent', () => {
  let component: CompanyContactDetailsFormComponent;
  let fixture: ComponentFixture<CompanyContactDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, SharedCompanyFormsModule, HelperPipesModule],
      declarations: [CompanyContactDetailsFormComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyContactDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
