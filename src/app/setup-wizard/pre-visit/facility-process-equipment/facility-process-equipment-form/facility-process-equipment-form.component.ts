import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBox, faChevronLeft, faChevronRight, faSplotch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Observable, of, Subscription } from 'rxjs';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

@Component({
    selector: 'app-facility-process-equipment-form',
    templateUrl: './facility-process-equipment-form.component.html',
    styleUrl: './facility-process-equipment-form.component.css',
    standalone: false
})
export class FacilityProcessEquipmentFormComponent {

  faChevronLeft: IconDefinition = faChevronLeft;
  faChevronRight: IconDefinition = faChevronRight;
  faSplotch: IconDefinition = faSplotch;

  equipmentGuid: string;
  processEquipments: Array<IdbProcessEquipment>;
  equipmentsSub: Subscription;
  equipment: IdbProcessEquipment;
  routeGuardWarningModal: boolean = false;

  facility: IdbFacility;
  facilitySub: Subscription;
  equipmentIndex: number;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService,
    private facilityIdbService: FacilityIdbService
  ) {

  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(val => {
      this.facility = val;
    });
    this.activatedRoute.params.subscribe(params => {
      this.equipmentGuid = params['id'];
      this.setEquipment();
    });
    this.equipmentsSub = this.processEquipmentIdbService.processEquipments.subscribe(processEquipments => {
      this.processEquipments = processEquipments.filter(eq => { return eq.facilityId == this.facility.guid });
      this.setEquipment();
    });
  }

  ngOnDestroy() {
    this.equipmentsSub.unsubscribe();
    this.facilitySub.unsubscribe();
  }

  setEquipment() {
    if (this.processEquipments) {
      this.equipmentIndex = this.processEquipments.findIndex(eq => { return eq.guid == this.equipmentGuid });
      if (this.equipmentIndex == -1) {
        let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
        this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-end-uses')
      } else {
        this.equipment = this.processEquipments[this.equipmentIndex];
      }
    }
  }

  async goToNext() {
    this.equipmentIndex++;
    if (this.processEquipments[this.equipmentIndex]) {
      this.goToProcessEquipment(this.processEquipments[this.equipmentIndex])
    } else {
      if (!this.facility.sidebarPreAssessmentOpen) {
        this.facility.sidebarPreAssessmentOpen = true;
        this.facility.sidebarEndUseInventoryOpen = false;
        await this.facilityIdbService.updateWithObservable(this.facility);
      }
      let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
      this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-pre-assessment');
    }
  }

  async goBack() {
    if (this.equipmentIndex == 0) {
      let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
      this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-end-uses');
    } else {
      this.equipmentIndex--;
      this.goToProcessEquipment(this.processEquipments[this.equipmentIndex])
    }
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

  goToProcessEquipment(equipment: IdbProcessEquipment) {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-end-uses/' + equipment.guid);
  }
}
