import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft, faChevronRight, faList, faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { getNewIdbEnergyEquipment, IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbFacility } from 'src/app/models/facility';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import * as _ from 'lodash';
import { BootstrapService } from 'src/app/shared/shared-services/bootstrap.service';
import { LocalStorageDataService } from 'src/app/shared/shared-services/local-storage-data.service';

@Component({
  selector: 'app-facility-energy-equipment-setup',
  templateUrl: './facility-energy-equipment-setup.component.html',
  styleUrl: './facility-energy-equipment-setup.component.css'
})
export class FacilityEnergyEquipmentSetupComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faPlus: IconDefinition = faPlus;
  faList: IconDefinition = faList;
  facility: IdbFacility;
  
  energyEquipmentsSub: Subscription
  energyEquipments: Array<IdbEnergyEquipment>;
  energyEquipmentGuids: Array<string> = [];
  accordionGuid: string;
  isAddNew: boolean = false;
  constructor(private facilityIdbService: FacilityIdbService, private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private bootstrapService: BootstrapService,
    private localStorageDataService: LocalStorageDataService,
    private cd: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    this.facility = this.facilityIdbService.selectedFacility.getValue();
    if (!this.facility) {
      this.router.navigateByUrl('/welcome')
    }

    this.energyEquipmentsSub = this.energyEquipmentIdbService.energyEquipments.subscribe(_energyEquipments => {
      this.energyEquipments = _energyEquipments;
      this.setEnergyEquipmentGuids();
    });
  }

  ngOnDestroy() {
    this.energyEquipmentsSub.unsubscribe();
  }

  ngAfterViewInit() {
    //open the accordion for last viewed neb
    let lastEquipmentGuid: string = this.localStorageDataService.energyEquipmentAccordionGuid;
    if (lastEquipmentGuid && this.energyEquipmentGuids.includes(lastEquipmentGuid)) {
      this.toggleBS(lastEquipmentGuid);
      this.cd.detectChanges();
    }
  }

  async addEquipment() {
    this.isAddNew = true;
    let newEnergyEquipment: IdbEnergyEquipment = getNewIdbEnergyEquipment(
      this.facility.userId,
      this.facility.companyId,
      this.facility.guid,
      this.facility.unitSettings);
    await firstValueFrom(this.energyEquipmentIdbService.addWithObservable(newEnergyEquipment));
    await this.energyEquipmentIdbService.setEnergyEquipments();
  }

  goBack() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-setup');
  }

  goToNext() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/end-uses');
  }

  setEnergyEquipmentGuids() {
    // only want to update neb list if changes made
    // otherwise forms get re-init when the list updates
    if (this.facility && this.energyEquipments) {
      let facilityEnergyEquipments: Array<IdbEnergyEquipment> = this.energyEquipments.filter(energyEquipment => {
        return energyEquipment.facilityId == this.facility.guid
      });
      let tmpEquipmentGuids: Array<string> = facilityEnergyEquipments.map(neb => {
        return neb.guid
      });
      if (tmpEquipmentGuids.length != this.energyEquipmentGuids.length) {
        this.energyEquipmentGuids = tmpEquipmentGuids;
      } else {
        let xor: Array<string> = _.xor(this.energyEquipmentGuids, tmpEquipmentGuids)
        if (xor.length != 0) {
          this.energyEquipmentGuids = tmpEquipmentGuids;
        }
      }
    } else {
      this.energyEquipmentGuids = [];
    }
  }

  toggleBS(equipmentGuid: string) {
    this.bootstrapService.bsCollapse('#' + equipmentGuid);
    if (this.accordionGuid != equipmentGuid) {
      this.accordionGuid = equipmentGuid;
    } else {
      this.accordionGuid = undefined;
    }
    this.localStorageDataService.setEnergyEquipmentAccordionGuid(this.accordionGuid);
  }

  childFormInitialized(equipmentGuid: string, isLast: boolean) {
    if (this.isAddNew == true && isLast) {
      this.toggleBS(equipmentGuid);
      this.isAddNew = false;
      this.cd.detectChanges();
    }
  }
}
