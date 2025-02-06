import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSplotch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

@Component({
  selector: 'app-process-equipment-discovery',
  standalone: false,

  templateUrl: './process-equipment-discovery.component.html',
  styleUrl: './process-equipment-discovery.component.css'
})
export class ProcessEquipmentDiscoveryComponent {
  faSplotch: IconDefinition = faSplotch;
  processEquipment: IdbProcessEquipment;
  constructor(private activatedRoute: ActivatedRoute,
    private processEquipmentIdbService: ProcessEquipmentIdbService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let equipmentId: string = params['id'];
      this.processEquipment = this.processEquipmentIdbService.getByGuid(equipmentId);
    });
  }
}
