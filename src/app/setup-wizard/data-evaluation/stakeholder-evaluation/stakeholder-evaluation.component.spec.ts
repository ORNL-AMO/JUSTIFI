import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholderEvaluationComponent } from './stakeholder-evaluation.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';

describe('StakeholderEvaluationComponent', () => {
  let component: StakeholderEvaluationComponent;
  let fixture: ComponentFixture<StakeholderEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule],
      declarations: [StakeholderEvaluationComponent],
      providers: stubServiceProviders
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
