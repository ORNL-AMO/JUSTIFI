import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompanyContactsComponent } from './manage-company-contacts.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('ManageCompanyContactsComponent', () => {
  let component: ManageCompanyContactsComponent;
  let fixture: ComponentFixture<ManageCompanyContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, TableEntriesModule, HelperPipesModule],
      declarations: [ManageCompanyContactsComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCompanyContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
