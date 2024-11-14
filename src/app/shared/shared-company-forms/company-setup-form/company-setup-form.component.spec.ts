import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySetupFormComponent } from './company-setup-form.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { SharedSettingsFormsModule } from '../../shared-settings-forms/shared-settings-forms.module';
import { LabelWithTooltipModule } from '../../label-with-tooltip/label-with-tooltip.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CompanySetupFormComponent', () => {
  let component: CompanySetupFormComponent;
  let fixture: ComponentFixture<CompanySetupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedSettingsFormsModule, LabelWithTooltipModule, FormsModule, ReactiveFormsModule],
      declarations: [CompanySetupFormComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanySetupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
