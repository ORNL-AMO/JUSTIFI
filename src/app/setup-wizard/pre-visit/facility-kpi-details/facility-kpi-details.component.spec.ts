import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacilityKpiDetailsComponent } from './facility-kpi-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { SharedFacilityFormsModule } from 'src/app/shared/shared-facility-forms/shared-facility-forms.module';

describe('FacilityKpiDetailsComponent', () => {
  let component: FacilityKpiDetailsComponent;
  let fixture: ComponentFixture<FacilityKpiDetailsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, RouterTestingModule, HelperPipesModule, SharedFacilityFormsModule],
      declarations: [FacilityKpiDetailsComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(FacilityKpiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
