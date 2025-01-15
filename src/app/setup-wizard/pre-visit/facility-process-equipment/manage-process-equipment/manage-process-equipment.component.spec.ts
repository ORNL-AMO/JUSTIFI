import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProcessEquipmentComponent } from './manage-process-equipment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';

describe('ManageProcessEquipmentComponent', () => {
  let component: ManageProcessEquipmentComponent;
  let fixture: ComponentFixture<ManageProcessEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule, TableEntriesModule],
      declarations: [ManageProcessEquipmentComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProcessEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
