import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndUseInventoryHomeComponent } from './end-use-inventory-home.component';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedCompanyFormsModule } from 'src/app/shared/shared-company-forms/shared-company-forms.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('EndUseInventoryHomeComponent', () => {
  let component: EndUseInventoryHomeComponent;
  let fixture: ComponentFixture<EndUseInventoryHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedCompanyFormsModule, FontAwesomeModule, HelperPipesModule, TableEntriesModule],
      declarations: [EndUseInventoryHomeComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndUseInventoryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
