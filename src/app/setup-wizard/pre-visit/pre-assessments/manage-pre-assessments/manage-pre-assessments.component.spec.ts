import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePreAssessmentsComponent } from './manage-pre-assessments.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { FormsModule } from '@angular/forms';

describe('ManagePreAssessmentsComponent', () => {
  let component: ManagePreAssessmentsComponent;
  let fixture: ComponentFixture<ManagePreAssessmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule, FormsModule],
      declarations: [ManagePreAssessmentsComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePreAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
