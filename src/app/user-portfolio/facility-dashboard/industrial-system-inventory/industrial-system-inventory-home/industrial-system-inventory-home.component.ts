import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { getNewIdbEnergyEquipment, IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbFacility } from 'src/app/models/facility';

@Component({
  selector: 'app-industrial-system-inventory-home',
  templateUrl: './industrial-system-inventory-home.component.html',
  styleUrl: './industrial-system-inventory-home.component.css'
})
export class IndustrialSystemInventoryHomeComponent {

  faPlus: IconDefinition = faPlus;

  facility: IdbFacility;
  facilitySub: Subscription;
  energyEquipmentsSub: Subscription
  energyEquipments: Array<IdbEnergyEquipment>;

  companyEnergyUnit: string;
  companySub: Subscription;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;
  constructor(private facilityIdbService: FacilityIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private companyIdbService: CompanyIdbService,
    private contactIdbService: ContactIdbService,
    private toastNotificationService: ToastNotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(company => {
      this.companyEnergyUnit = company.companyEnergyUnit;
    });

    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(facility => {
      this.facility = facility;
    });

    this.energyEquipmentsSub = this.energyEquipmentIdbService.energyEquipments.subscribe(energyEquipments => {
      this.energyEquipments = energyEquipments.filter(equipment => {
        return equipment.facilityId == this.facility.guid;
      });
    });

    this.contactsSub = this.contactIdbService.contacts.subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  ngOnDestroy() {
    this.energyEquipmentsSub.unsubscribe();
    this.facilitySub.unsubscribe();
    this.companySub.unsubscribe();
    this.contactsSub.unsubscribe();
  }

  async addEquipment() {
    let newEnergyEquipment: IdbEnergyEquipment = getNewIdbEnergyEquipment(
      this.facility.userId,
      this.facility.companyId,
      this.facility.guid,
      this.facility.unitSettings);
    await firstValueFrom(this.energyEquipmentIdbService.addWithObservable(newEnergyEquipment));
    await this.energyEquipmentIdbService.setEnergyEquipments();
    this.toastNotificationService.showToast('Equipment Added!', 'New industrial system equipment has been added to the inventory for ' + this.facility.generalInformation.name + '!', 'bg-success', true, false);
    this.router.navigateByUrl('/portfolio/facility/' + newEnergyEquipment.facilityId + '/system-inventory/' + newEnergyEquipment.guid);
  }

}
