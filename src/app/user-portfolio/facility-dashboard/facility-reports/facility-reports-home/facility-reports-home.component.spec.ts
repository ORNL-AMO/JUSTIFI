import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityReportsHomeComponent } from './facility-reports-home.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';

describe('FacilityReportsHomeComponent', () => {
  let component: FacilityReportsHomeComponent;
  let fixture: ComponentFixture<FacilityReportsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule, FontAwesomeModule, HelperPipesModule, TableEntriesModule],
      declarations: [FacilityReportsHomeComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityReportsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
