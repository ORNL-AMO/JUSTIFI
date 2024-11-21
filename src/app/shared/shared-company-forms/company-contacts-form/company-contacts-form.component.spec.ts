import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactsFormComponent } from './company-contacts-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('CompanyContactsFormComponent', () => {
  let component: CompanyContactsFormComponent;
  let fixture: ComponentFixture<CompanyContactsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FontAwesomeModule, HelperPipesModule],
      declarations: [CompanyContactsFormComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompanyContactsFormComponent);
    component = fixture.componentInstance;
    component.contactGuid = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
