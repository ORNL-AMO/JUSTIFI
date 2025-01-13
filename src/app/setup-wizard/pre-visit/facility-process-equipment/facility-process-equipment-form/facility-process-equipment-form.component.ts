import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBox, faChevronLeft, faChevronRight, faSplotch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Observable, of, Subscription } from 'rxjs';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

@Component({
  selector: 'app-facility-process-equipment-form',
  templateUrl: './facility-process-equipment-form.component.html',
  styleUrl: './facility-process-equipment-form.component.css'
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
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.equipmentGuid = params['id'];
      this.setEquipment();
    });
    this.equipmentsSub = this.processEquipmentIdbService.processEquipments.subscribe(processEquipments => {
      this.processEquipments = processEquipments;
      this.setEquipment();
    });
  }

  ngOnDestroy() {
    this.equipmentsSub.unsubscribe();
  }

  setEquipment() {
    if (this.processEquipments) {
      this.equipment = this.processEquipments.find(eq => { return eq.guid == this.equipmentGuid });
      if (!this.equipment) {
        let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
        this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/end-uses')
      }
    }
  }

  goToNext() {
    //TODO: implement next
  }

  goBack() {
    //TODO: Implement back

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
