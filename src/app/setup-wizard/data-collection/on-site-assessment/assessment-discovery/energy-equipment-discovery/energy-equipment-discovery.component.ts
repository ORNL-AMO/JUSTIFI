import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCube, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';

@Component({
  selector: 'app-energy-equipment-discovery',
  standalone: false,

  templateUrl: './energy-equipment-discovery.component.html',
  styleUrl: './energy-equipment-discovery.component.css'
})
export class EnergyEquipmentDiscoveryComponent {
  faCube: IconDefinition = faCube;
  
  energyEquipment: IdbEnergyEquipment;
  constructor(private activatedRoute: ActivatedRoute,
    private energyEquipmentIdbService: EnergyEquipmentIdbService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let equipmentId: string = params['id'];
      this.energyEquipment = this.energyEquipmentIdbService.getByGuid(equipmentId);
    });
  }
}
