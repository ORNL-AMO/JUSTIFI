import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolQuestionsModalComponent } from './protocol-questions-modal.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

describe('ProtocolQuestionsModalComponent', () => {
  let component: ProtocolQuestionsModalComponent;
  let fixture: ComponentFixture<ProtocolQuestionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [ProtocolQuestionsModalComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProtocolQuestionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
