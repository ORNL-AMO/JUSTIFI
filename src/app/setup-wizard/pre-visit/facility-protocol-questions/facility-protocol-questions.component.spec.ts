import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityProtocolQuestionsComponent } from './facility-protocol-questions.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { SharedFacilityFormsModule } from 'src/app/shared/shared-facility-forms/shared-facility-forms.module';

describe('FacilityProtocolQuestionsComponent', () => {
  let component: FacilityProtocolQuestionsComponent;
  let fixture: ComponentFixture<FacilityProtocolQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, FontAwesomeModule, SharedFacilityFormsModule],
      declarations: [FacilityProtocolQuestionsComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityProtocolQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
