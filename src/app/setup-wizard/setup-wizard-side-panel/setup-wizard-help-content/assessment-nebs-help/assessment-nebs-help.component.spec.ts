import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentNebsHelpComponent } from './assessment-nebs-help.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('AssessmentNebsHelpComponent', () => {
  let component: AssessmentNebsHelpComponent;
  let fixture: ComponentFixture<AssessmentNebsHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, ],
      declarations: [AssessmentNebsHelpComponent],
      providers: stubServiceProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentNebsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
