import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCollectionManageAssessmentsComponent } from './data-collection-manage-assessments.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('DataCollectionManageAssessmentsComponent', () => {
  let component: DataCollectionManageAssessmentsComponent;
  let fixture: ComponentFixture<DataCollectionManageAssessmentsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, FontAwesomeModule, HelperPipesModule],
      declarations: [DataCollectionManageAssessmentsComponent],
      providers: stubServiceProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataCollectionManageAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
