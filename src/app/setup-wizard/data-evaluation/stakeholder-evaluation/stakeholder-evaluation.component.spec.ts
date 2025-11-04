import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholderEvaluationComponent } from './stakeholder-evaluation.component';

describe('StakeholderEvaluationComponent', () => {
  let component: StakeholderEvaluationComponent;
  let fixture: ComponentFixture<StakeholderEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StakeholderEvaluationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StakeholderEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
