import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentNebsHomeComponent } from './assessment-nebs-home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AssessmentNebsHomeComponent', () => {
  let component: AssessmentNebsHomeComponent;
  let fixture: ComponentFixture<AssessmentNebsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule, TableEntriesModule, RouterTestingModule],
      declarations: [AssessmentNebsHomeComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentNebsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
