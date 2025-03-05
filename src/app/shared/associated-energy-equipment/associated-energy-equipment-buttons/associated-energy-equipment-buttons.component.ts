import { Component, Input } from '@angular/core';
import { faCube, faLink, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbFacility } from 'src/app/models/facility';

@Component({
  selector: 'app-associated-energy-equipment-buttons',
  standalone: false,

  templateUrl: './associated-energy-equipment-buttons.component.html',
  styleUrl: './associated-energy-equipment-buttons.component.css'
})
export class AssociatedEnergyEquipmentButtonsComponent {
  @Input({ required: true })
  itemGuid: string;
  @Input({ required: true })
  itemContext: 'assessment' | 'processEquipment' | 'energyEquipment' | 'energyOpportunity';

  faLink: IconDefinition = faLink;
  faCube: IconDefinition = faCube;

  energyEquipmentOptions: Array<IdbEnergyEquipment>;
  energyEquipmentSub: Subscription;

  selectedEquipment: IdbEnergyEquipment;
  facility: IdbFacility;
  showModal: boolean = false;
  constructor(private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private facilityIdbService: FacilityIdbService
  ) {
  }

  ngOnInit() {
    this.facility = this.facilityIdbService.selectedFacility.getValue();
    this.energyEquipmentSub = this.energyEquipmentIdbService.energyEquipments.subscribe(energyEquipments => {
      this.energyEquipmentOptions = energyEquipments;
    });
  }

  ngOnDestroy() {
    this.energyEquipmentSub.unsubscribe();
  }

  openModal(energyEquipment: IdbEnergyEquipment) {
    this.selectedEquipment = energyEquipment;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
