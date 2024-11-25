import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEquipmentSummaryComponent } from './process-equipment-summary.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';

describe('ProcessEquipmentSummaryComponent', () => {
  let component: ProcessEquipmentSummaryComponent;
  let fixture: ComponentFixture<ProcessEquipmentSummaryComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule, TableEntriesModule],
      declarations: [ProcessEquipmentSummaryComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProcessEquipmentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
