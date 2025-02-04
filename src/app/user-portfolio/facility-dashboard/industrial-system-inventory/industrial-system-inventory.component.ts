import { Component } from '@angular/core';
import { faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbFacility } from 'src/app/models/facility';

@Component({
    selector: 'app-industrial-system-inventory',
    templateUrl: './industrial-system-inventory.component.html',
    styleUrl: './industrial-system-inventory.component.css',
    standalone: false
})
export class IndustrialSystemInventoryComponent {

  faChevronRight: IconDefinition = faChevronRight;

  facility: IdbFacility;
  facilitySub: Subscription;


  energyEquipmentsSub: Subscription
  energyEquipments: Array<IdbEnergyEquipment>;

  constructor(private facilityIdbService: FacilityIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService
  ) { }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(facility => {
      this.facility = facility;
    });

    this.energyEquipmentsSub = this.energyEquipmentIdbService.energyEquipments.subscribe(energyEquipments => {
      this.energyEquipments = energyEquipments.filter(equipment => {
        return equipment.facilityId == this.facility.guid;
      });
    });
  }

  ngOnDestroy() {
    this.energyEquipmentsSub.unsubscribe();
    this.facilitySub.unsubscribe();
  }
}
