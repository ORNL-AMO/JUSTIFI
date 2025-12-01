import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardModalComponent } from './setup-wizard-modal.component';
import { FormsModule } from '@angular/forms';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';

describe('SetupWizardModalComponent', () => {
  let component: SetupWizardModalComponent;
  let fixture: ComponentFixture<SetupWizardModalComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HelperPipesModule],
      declarations: [SetupWizardModalComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(SetupWizardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
