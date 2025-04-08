import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEvaluationManageReportsComponent } from './data-evaluation-manage-reports.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';

describe('DataEvaluationManageReportsComponent', () => {
  let component: DataEvaluationManageReportsComponent;
  let fixture: ComponentFixture<DataEvaluationManageReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterModule, HelperPipesModule],
      declarations: [DataEvaluationManageReportsComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataEvaluationManageReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
