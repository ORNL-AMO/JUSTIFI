import { Component } from '@angular/core';
import { faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

@Component({
    selector: 'app-end-use-inventory',
    templateUrl: './end-use-inventory.component.html',
    styleUrl: './end-use-inventory.component.css',
    standalone: false
})
export class EndUseInventoryComponent {

  faChevronRight: IconDefinition = faChevronRight;

  facility: IdbFacility;
  facilitySub: Subscription;
  processEquipmentSub: Subscription
  processEquipments: Array<IdbProcessEquipment>;

  constructor(private facilityIdbService: FacilityIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService
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
  }

  ngOnDestroy() {
    this.processEquipmentSub.unsubscribe();
    this.facilitySub.unsubscribe();
  }
}
