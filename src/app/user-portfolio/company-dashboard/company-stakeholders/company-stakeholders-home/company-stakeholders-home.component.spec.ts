import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStakeholdersHomeComponent } from './company-stakeholders-home.component';
import { SharedCompanyFormsModule } from 'src/app/shared/shared-company-forms/shared-company-forms.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';

describe('CompanyStakeholdersHomeComponent', () => {
  let component: CompanyStakeholdersHomeComponent;
  let fixture: ComponentFixture<CompanyStakeholdersHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedCompanyFormsModule, FontAwesomeModule, HelperPipesModule, TableEntriesModule],
      declarations: [CompanyStakeholdersHomeComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyStakeholdersHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
