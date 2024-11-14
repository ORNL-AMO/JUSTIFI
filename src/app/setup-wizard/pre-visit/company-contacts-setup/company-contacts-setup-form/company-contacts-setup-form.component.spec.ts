import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactsSetupFormComponent } from './company-contacts-setup-form.component';
import { SharedCompanyFormsModule } from 'src/app/shared/shared-company-forms/shared-company-forms.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';

describe('CompanyContactsSetupFormComponent', () => {
  let component: CompanyContactsSetupFormComponent;
  let fixture: ComponentFixture<CompanyContactsSetupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedCompanyFormsModule, FontAwesomeModule, HelperPipesModule],
      declarations: [CompanyContactsSetupFormComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyContactsSetupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
