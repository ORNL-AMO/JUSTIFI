import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft, faChevronRight, faList, faPlus, faUpload, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbFacility } from 'src/app/models/facility';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { getNewIdbProcessEquipment, IdbProcessEquipment } from 'src/app/models/processEquipment';

@Component({
    selector: 'app-manage-process-equipment',
    templateUrl: './manage-process-equipment.component.html',
    styleUrl: './manage-process-equipment.component.css',
    standalone: false
})
export class ManageProcessEquipmentComponent {
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faList: IconDefinition = faList;
  faPlus: IconDefinition = faPlus;
  faUpload: IconDefinition = faUpload;

  processEquipments: Array<IdbProcessEquipment>;
  processEquipmentSub: Subscription;

  facility: IdbFacility;
  facilitySub: Subscription;

  onSiteVisitSub: Subscription;
  onSiteVisit: IdbOnSiteVisit;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;

  constructor(private router: Router,
    private facilityIdbService: FacilityIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private contactIdbService: ContactIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService
  ) {
  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(selectedFacility => {
      this.facility = selectedFacility;
    });
    this.processEquipmentSub = this.processEquipmentIdbService.processEquipments.subscribe(equipments => {
      this.processEquipments = equipments.filter(eq => { return eq.facilityId == this.facility.guid });
    });
    this.onSiteVisitSub = this.onSiteVisitIdbService.selectedVisit.subscribe(visit => {
      this.onSiteVisit = visit;
    });
    this.contactsSub = this.contactIdbService.contacts.subscribe(contacts => {
      this.contacts = contacts;
    })
  }

  ngOnDestroy() {
    this.facilitySub.unsubscribe();
    this.processEquipmentSub.unsubscribe();
    this.onSiteVisitSub.unsubscribe();
    this.contactsSub.unsubscribe();
  }

  async addEquipment() {
    let newEquipment: IdbProcessEquipment = getNewIdbProcessEquipment(
      this.facility.userId,
      this.facility.companyId,
      this.facility.guid);
    await firstValueFrom(this.processEquipmentIdbService.addWithObservable(newEquipment));
    await this.processEquipmentIdbService.setProcessEquipments();
    this.goToProcessEquipment(newEquipment);
  }

  async goBack() {
    if (!this.facility.sidebarSystemInventoryOpen) {
      this.facility.sidebarSystemInventoryOpen = true;
      this.facility.sidebarEndUseInventoryOpen = false;
      await this.facilityIdbService.asyncUpdate(this.facility);
    }
    let energyEquipments: Array<IdbEnergyEquipment> = this.energyEquipmentIdbService.getByOtherGuid(this.facility.guid, 'facility');
    if (energyEquipments.length == 0) {
      this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/facility-energy-equipment')
    } else {
      this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/facility-energy-equipment/' + energyEquipments[energyEquipments.length - 1].guid)
    }
  }

  async goToNext() {
    if (this.processEquipments.length != 0) {
      this.goToProcessEquipment(this.processEquipments[0])
    } else {
      if (!this.facility.sidebarPreAssessmentOpen) {
        this.facility.sidebarPreAssessmentOpen = true;
        this.facility.sidebarEndUseInventoryOpen = false;
        await this.facilityIdbService.asyncUpdate(this.facility);
      }
      this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/facility-pre-assessment')
    }
  }

  goToProcessEquipment(equipment: IdbProcessEquipment) {
    this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/facility-end-uses/' + equipment.guid);
  }
  
  goToUploadTemplate() {
    this.router.navigateByUrl('/setup-wizard/upload-template/' + this.onSiteVisit.guid);
  }
}
