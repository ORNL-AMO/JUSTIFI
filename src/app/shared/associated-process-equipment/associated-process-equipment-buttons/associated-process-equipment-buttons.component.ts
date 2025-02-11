import { Component, Input } from '@angular/core';
import { faLink, faSplotch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

@Component({
  selector: 'app-associated-process-equipment-buttons',
  standalone: false,

  templateUrl: './associated-process-equipment-buttons.component.html',
  styleUrl: './associated-process-equipment-buttons.component.css'
})
export class AssociatedProcessEquipmentButtonsComponent {
  @Input({ required: true })
  itemGuid: string;
  @Input({ required: true })
  itemContext: 'energyOpportunity' | 'industrialSystem';

  faLink: IconDefinition = faLink;
  faSplotch: IconDefinition = faSplotch;
  
  processEquipmentOptions: Array<IdbProcessEquipment>;
  processEquipmentSub: Subscription;

  selectedEquipment: IdbProcessEquipment;
  facility: IdbFacility;
  showModal: boolean = false;
  constructor(private processEquipmentIdbService: ProcessEquipmentIdbService,
    private facilityIdbService: FacilityIdbService
  ) {
  }

  ngOnInit() {
    //TODO: verify selected facility okay here..
    this.facility = this.facilityIdbService.selectedFacility.getValue();
    this.processEquipmentSub = this.processEquipmentIdbService.processEquipments.subscribe(processEquipments => {
      this.processEquipmentOptions = processEquipments;
    });
  }

  ngOnDestroy() {
    this.processEquipmentSub.unsubscribe();
  }

  openModal(processEquipment: IdbProcessEquipment) {
    this.selectedEquipment = processEquipment;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}
