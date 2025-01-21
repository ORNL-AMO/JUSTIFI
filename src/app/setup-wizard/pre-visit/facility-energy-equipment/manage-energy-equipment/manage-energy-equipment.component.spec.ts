import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEnergyEquipmentComponent } from './manage-energy-equipment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';

describe('ManageEnergyEquipmentComponent', () => {
  let component: ManageEnergyEquipmentComponent;
  let fixture: ComponentFixture<ManageEnergyEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, TableEntriesModule, HelperPipesModule],
      declarations: [ManageEnergyEquipmentComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEnergyEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
