import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBox, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Observable, of, Subscription } from 'rxjs';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

@Component({
  selector: 'app-facility-energy-equipment-form',
  templateUrl: './facility-energy-equipment-form.component.html',
  styleUrl: './facility-energy-equipment-form.component.css'
})
export class FacilityEnergyEquipmentFormComponent {

  faBox: IconDefinition = faBox;

  equipmentGuid: string;
  energyEquipments: Array<IdbEnergyEquipment>;
  equipmentsSub: Subscription;
  equipment: IdbEnergyEquipment;
  routeGuardWarningModal: boolean = false;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.equipmentGuid = params['id'];
      this.setEquipment();
    });
    this.equipmentsSub = this.energyEquipmentIdbService.energyEquipments.subscribe(energyEquipments => {
      this.energyEquipments = energyEquipments;
      this.setEquipment();
    });
  }

  ngOnDestroy() {
    this.equipmentsSub.unsubscribe();
  }

  setEquipment() {
    if (this.energyEquipments) {
      this.equipment = this.energyEquipments.find(eq => { return eq.guid == this.equipmentGuid });
      if (!this.equipment) {
        let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
        this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/energy-equipment')
      }
    }
  }

  next() {
    //TODO: implement next
  }

  goBack() {
    //TODO: Implement back

  }

  canDeactivate(): Observable<boolean> {
    if (!this.equipment.equipmentName) {
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
