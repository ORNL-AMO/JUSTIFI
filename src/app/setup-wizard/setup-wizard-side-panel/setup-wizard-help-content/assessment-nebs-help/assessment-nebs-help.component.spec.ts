import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentNebsHelpComponent } from './assessment-nebs-help.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('AssessmentNebsHelpComponent', () => {
  let component: AssessmentNebsHelpComponent;
  let fixture: ComponentFixture<AssessmentNebsHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [AssessmentNebsHelpComponent]
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
