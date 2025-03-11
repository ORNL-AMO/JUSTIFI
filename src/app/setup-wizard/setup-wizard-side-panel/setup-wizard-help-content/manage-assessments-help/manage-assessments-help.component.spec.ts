import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAssessmentsHelpComponent } from './manage-assessments-help.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('ManageAssessmentsHelpComponent', () => {
  let component: ManageAssessmentsHelpComponent;
  let fixture: ComponentFixture<ManageAssessmentsHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ManageAssessmentsHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageAssessmentsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
