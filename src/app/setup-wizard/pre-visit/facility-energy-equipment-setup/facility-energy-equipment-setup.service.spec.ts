import { TestBed } from '@angular/core/testing';

import { FacilityEnergyEquipmentSetupService } from './facility-energy-equipment-setup.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';

describe('FacilityEnergyEquipmentSetupService', () => {
  let service: FacilityEnergyEquipmentSetupService;
  let energyEquipmentIdbService: Partial<EnergyEquipmentIdbService> = {};
  let companyIdbService: Partial<CompanyIdbService> = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: EnergyEquipmentIdbService, useValue: energyEquipmentIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService }
      ]
    });
    service = TestBed.inject(FacilityEnergyEquipmentSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
