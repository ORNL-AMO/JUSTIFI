import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitySetupFormComponent } from './facility-setup-form.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { SharedSettingsFormsModule } from '../../shared-settings-forms/shared-settings-forms.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelWithTooltipModule } from '../../label-with-tooltip/label-with-tooltip.module';

describe('FacilitySetupFormComponent', () => {
  let component: FacilitySetupFormComponent;
  let fixture: ComponentFixture<FacilitySetupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedSettingsFormsModule, LabelWithTooltipModule, FormsModule, ReactiveFormsModule],
      declarations: [FacilitySetupFormComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilitySetupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
