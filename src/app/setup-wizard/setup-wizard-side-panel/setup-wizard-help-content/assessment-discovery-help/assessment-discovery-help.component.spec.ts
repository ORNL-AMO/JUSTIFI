import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDiscoveryHelpComponent } from './assessment-discovery-help.component';

describe('AssessmentDiscoveryHelpComponent', () => {
  let component: AssessmentDiscoveryHelpComponent;
  let fixture: ComponentFixture<AssessmentDiscoveryHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentDiscoveryHelpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentDiscoveryHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
