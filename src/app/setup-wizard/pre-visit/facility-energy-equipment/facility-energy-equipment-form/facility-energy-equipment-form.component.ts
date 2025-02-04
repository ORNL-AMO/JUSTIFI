import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBox, faChevronLeft, faChevronRight, faCube, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Observable, of, Subscription } from 'rxjs';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbFacility } from 'src/app/models/facility';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

@Component({
    selector: 'app-facility-energy-equipment-form',
    templateUrl: './facility-energy-equipment-form.component.html',
    styleUrl: './facility-energy-equipment-form.component.css',
    standalone: false
})
export class FacilityEnergyEquipmentFormComponent {

  faCube: IconDefinition = faCube;
  faChevronLeft: IconDefinition = faChevronLeft;
  faChevronRight: IconDefinition = faChevronRight;

  equipmentGuid: string;
  energyEquipments: Array<IdbEnergyEquipment>;
  equipmentsSub: Subscription;
  equipment: IdbEnergyEquipment;
  routeGuardWarningModal: boolean = false;

  facility: IdbFacility;
  facilitySub: Subscription;
  equipmentIndex: number;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private facilityIdbService: FacilityIdbService
  ) {

  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(val => {
      this.facility = val;
    })
    this.activatedRoute.params.subscribe(params => {
      this.equipmentGuid = params['id'];
      this.setEquipment();
    });
    this.equipmentsSub = this.energyEquipmentIdbService.energyEquipments.subscribe(energyEquipments => {
      this.energyEquipments = energyEquipments.filter(eq => { return eq.facilityId == this.facility.guid });
      this.setEquipment();
    });
  }

  ngOnDestroy() {
    this.equipmentsSub.unsubscribe();
    this.facilitySub.unsubscribe();
  }

  setEquipment() {
    if (this.energyEquipments) {
      this.equipmentIndex = this.energyEquipments.findIndex(eq => { return eq.guid == this.equipmentGuid })
      if (this.equipmentIndex == -1) {
        let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
        this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-energy-equipment')
      } else {
        this.equipment = this.energyEquipments[this.equipmentIndex];
      }
    }
  }

  async goToNext() {
    this.equipmentIndex++;
    if (this.energyEquipments[this.equipmentIndex]) {
      this.goToEnergyEquipment(this.energyEquipments[this.equipmentIndex]);
    } else {
      if (!this.facility.sidebarEndUseInventoryOpen) {
        this.facility.sidebarEndUseInventoryOpen = true;
        this.facility.sidebarSystemInventoryOpen = false;
        await this.facilityIdbService.asyncUpdate(this.facility);
      }
      let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
      this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-end-uses')
    }
  }

  goBack() {
    if (this.equipmentIndex != 0) {
      this.equipmentIndex--;
      this.goToEnergyEquipment(this.energyEquipments[this.equipmentIndex]);
    } else {
      let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
      this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-energy-equipment');
    }
  }

  goToEnergyEquipment(equipment: IdbEnergyEquipment) {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-energy-equipment/' + equipment.guid);
  }

  canDeactivate(): Observable<boolean> {
    if (this.equipment && !this.equipment.equipmentName) {
      this.displayWarningModal();
      return of(false);
    }
    return of(true);
  }

  displayWarningModal() {
    this.routeGuardWarningModal = true;
  }

  closeWarningModal() {
    this.routeGuardWarningModal = false;
  }
}
