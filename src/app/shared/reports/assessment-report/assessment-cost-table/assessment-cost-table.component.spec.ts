import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentCostTableComponent } from './assessment-cost-table.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('AssessmentCostTableComponent', () => {
  let component: AssessmentCostTableComponent;
  let fixture: ComponentFixture<AssessmentCostTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentCostTableComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentCostTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
