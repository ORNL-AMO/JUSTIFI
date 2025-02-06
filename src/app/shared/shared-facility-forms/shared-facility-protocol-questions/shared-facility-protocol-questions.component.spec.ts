import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFacilityProtocolQuestionsComponent } from './shared-facility-protocol-questions.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FormsModule } from '@angular/forms';

describe('SharedFacilityProtocolQuestionsComponent', () => {
  let component: SharedFacilityProtocolQuestionsComponent;
  let fixture: ComponentFixture<SharedFacilityProtocolQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SharedFacilityProtocolQuestionsComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedFacilityProtocolQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
