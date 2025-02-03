import { Component } from '@angular/core';
import { faList, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbFacility } from 'src/app/models/facility';

@Component({
    selector: 'app-system-inventory-summary',
    templateUrl: './system-inventory-summary.component.html',
    styleUrl: './system-inventory-summary.component.css',
    standalone: false
})
export class SystemInventorySummaryComponent {

  faList: IconDefinition = faList;

  facility: IdbFacility;
  energyEquipments: Array<IdbEnergyEquipment>;

  companyEnergyUnit: string;

  contacts: Array<IdbContact>;
  constructor(private facilityIdbService: FacilityIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private companyIdbService: CompanyIdbService,
    private contactIdbService: ContactIdbService
  ) { }

  ngOnInit() {
    let company: IdbCompany = this.companyIdbService.selectedCompany.getValue();
    this.companyEnergyUnit = company.companyEnergyUnit;
    this.facility = this.facilityIdbService.selectedFacility.getValue();
    this.energyEquipments = this.energyEquipmentIdbService.getByOtherGuid(this.facility.guid, 'facility');
    this.contacts = this.contactIdbService.contacts.getValue();
  }
}
