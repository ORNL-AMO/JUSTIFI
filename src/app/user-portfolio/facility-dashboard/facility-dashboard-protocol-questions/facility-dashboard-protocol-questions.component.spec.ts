import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDashboardProtocolQuestionsComponent } from './facility-dashboard-protocol-questions.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { SharedFacilityFormsModule } from 'src/app/shared/shared-facility-forms/shared-facility-forms.module';
import { ProtocolQuestionsModalComponent } from '../protocol-questions-modal/protocol-questions-modal.component';
import { FormsModule } from '@angular/forms';

describe('FacilityDashboardProtocolQuestionsComponent', () => {
  let component: FacilityDashboardProtocolQuestionsComponent;
  let fixture: ComponentFixture<FacilityDashboardProtocolQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, SharedFacilityFormsModule, FormsModule],
      declarations: [FacilityDashboardProtocolQuestionsComponent, ProtocolQuestionsModalComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityDashboardProtocolQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
