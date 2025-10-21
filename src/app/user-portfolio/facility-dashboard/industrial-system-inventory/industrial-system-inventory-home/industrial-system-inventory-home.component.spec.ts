import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrialSystemInventoryHomeComponent } from './industrial-system-inventory-home.component';
import { SharedCompanyFormsModule } from 'src/app/shared/shared-company-forms/shared-company-forms.module';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FormsModule } from '@angular/forms';
import { ProtocolQuestionsModalComponent } from '../../protocol-questions-modal/protocol-questions-modal.component';

describe('IndustrialSystemInventoryHomeComponent', () => {
  let component: IndustrialSystemInventoryHomeComponent;
  let fixture: ComponentFixture<IndustrialSystemInventoryHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedCompanyFormsModule, FontAwesomeModule, HelperPipesModule, TableEntriesModule, FormsModule],
      declarations: [IndustrialSystemInventoryHomeComponent, ProtocolQuestionsModalComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustrialSystemInventoryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
