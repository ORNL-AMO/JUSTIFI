import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft, faChevronRight, faList, faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { getNewIdbEnergyEquipment, IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbFacility } from 'src/app/models/facility';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

@Component({
  selector: 'app-manage-energy-equipment',
  templateUrl: './manage-energy-equipment.component.html',
  styleUrl: './manage-energy-equipment.component.css'
})
export class ManageEnergyEquipmentComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faList: IconDefinition = faList;
  faPlus: IconDefinition = faPlus;

  energyEquipments: Array<IdbEnergyEquipment>;
  energyEquipmentSub: Subscription;

  facility: IdbFacility;
  facilitySub: Subscription;

  onSiteVisitSub: Subscription;
  onSiteVisit: IdbOnSiteVisit;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;

  companyEnergyUnit: string;
  constructor(private router: Router,
    private facilityIdbService: FacilityIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private contactIdbService: ContactIdbService,
    private companyIdbService: CompanyIdbService
  ) {
  }

  ngOnInit() {
    this.companyEnergyUnit = this.companyIdbService.selectedCompany.getValue().companyEnergyUnit;
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(selectedFacility => {
      this.facility = selectedFacility;
    });
    this.energyEquipmentSub = this.energyEquipmentIdbService.energyEquipments.subscribe(equipments => {
      this.energyEquipments = equipments.filter(eq => { return eq.facilityId == this.facility.guid });
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
    this.energyEquipmentSub.unsubscribe();
    this.onSiteVisitSub.unsubscribe();
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
    this.goToEnergyEquipment(newEnergyEquipment);
  }

  goBack() {
    this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/kpi-select');
  }

  goToNext() {
    this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/end-uses');
  }

  goToEnergyEquipment(equipment: IdbEnergyEquipment) {
    this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/energy-equipment/' + equipment.guid);
  }
}
