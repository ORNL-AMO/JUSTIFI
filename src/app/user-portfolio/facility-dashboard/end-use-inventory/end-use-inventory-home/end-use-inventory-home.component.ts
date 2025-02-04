import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { IdbFacility } from 'src/app/models/facility';
import { getNewIdbProcessEquipment, IdbProcessEquipment } from 'src/app/models/processEquipment';

@Component({
    selector: 'app-end-use-inventory-home',
    templateUrl: './end-use-inventory-home.component.html',
    styleUrl: './end-use-inventory-home.component.css',
    standalone: false
})
export class EndUseInventoryHomeComponent {

  faPlus: IconDefinition = faPlus;
  facility: IdbFacility;
  facilitySub: Subscription;
  processEquipmentSub: Subscription
  processEquipments: Array<IdbProcessEquipment>;
  contacts: Array<IdbContact>;
  contactsSub: Subscription;
  constructor(private facilityIdbService: FacilityIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService,
    private contactIdbService: ContactIdbService,
    private toastNotificationService: ToastNotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(facility => {
      this.facility = facility;
    });

    this.processEquipmentSub = this.processEquipmentIdbService.processEquipments.subscribe(processEquipments => {
      this.processEquipments = processEquipments.filter(equipment => {
        return equipment.facilityId == this.facility.guid;
      });
    });
    this.contactsSub = this.contactIdbService.contacts.subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  ngOnDestroy() {
    this.processEquipmentSub.unsubscribe();
    this.facilitySub.unsubscribe();
    this.contactsSub.unsubscribe();
  }

  async addEquipment() {
    let newProcessEquipment: IdbProcessEquipment = getNewIdbProcessEquipment(this.facility.userId, this.facility.companyId, this.facility.guid);
    await firstValueFrom(this.processEquipmentIdbService.addWithObservable(newProcessEquipment));
    await this.processEquipmentIdbService.setProcessEquipments();
    this.toastNotificationService.showToast('End Use Added!', 'New end use item has been added to the inventory for ' + this.facility.generalInformation.name + '!', 'bg-success', true, false);
    this.router.navigateByUrl('/portfolio/facility/' + newProcessEquipment.facilityId + '/end-use-inventory/' + newProcessEquipment.guid);
  }
}
