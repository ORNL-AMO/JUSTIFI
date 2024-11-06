import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyEquipmentFormComponent } from './energy-equipment-form.component';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { getNewIdbEnergyEquipment, IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { BehaviorSubject } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';
import { FormsModule } from '@angular/forms';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { getDefaultUnitSettings } from 'src/app/models/unitSettings';

describe('EnergyEquipmentFormComponent', () => {
  let component: EnergyEquipmentFormComponent;
  let fixture: ComponentFixture<EnergyEquipmentFormComponent>;

  let contactIdbService: Partial<ContactIdbService> = {
    contacts: new BehaviorSubject<Array<IdbContact>>([])
  };
  let energyEquipmentIdbService: Partial<EnergyEquipmentIdbService> = {
    energyEquipments: new BehaviorSubject<Array<IdbEnergyEquipment>>([]),
    getByGuid: () => { return getNewIdbEnergyEquipment('', '', '', getDefaultUnitSettings()) }
  };
  let dbChangesService: Partial<DbChangesService> = {};
  let companyIdbService: Partial<CompanyIdbService> = {
    selectedCompany: new BehaviorSubject<IdbCompany>(null)
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    selectedFacility: new BehaviorSubject<IdbFacility>(null)
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule, FormsModule],
      declarations: [EnergyEquipmentFormComponent],
      providers: [
        { provide: DbChangesService, useValue: dbChangesService },
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: EnergyEquipmentIdbService, useValue: energyEquipmentIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EnergyEquipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
