import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityProtocolQuestionsHelpComponent } from './facility-protocol-questions-help.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('FacilityProtocolQuestionsHelpComponent', () => {
  let component: FacilityProtocolQuestionsHelpComponent;
  let fixture: ComponentFixture<FacilityProtocolQuestionsHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [FacilityProtocolQuestionsHelpComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityProtocolQuestionsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
