import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFollowUpComponent } from './data-follow-up.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { ProtocolQuestionsModalComponent } from 'src/app/user-portfolio/facility-dashboard/protocol-questions-modal/protocol-questions-modal.component';
import { FormsModule } from '@angular/forms';

describe('DataFollowUpComponent', () => {
  let component: DataFollowUpComponent;
  let fixture: ComponentFixture<DataFollowUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule, FormsModule],
      declarations: [DataFollowUpComponent, ProtocolQuestionsModalComponent],
      providers: stubServiceProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
