import { Component } from '@angular/core';
import { IconDefinition, faDiagramProject, faUser } from '@fortawesome/free-solid-svg-icons';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { IdbFacility } from 'src/app/models/facility';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

@Component({
  selector: 'app-process-equipment-summary',
  templateUrl: './process-equipment-summary.component.html',
  styleUrl: './process-equipment-summary.component.css'
})
export class ProcessEquipmentSummaryComponent {

  faDiagramProject: IconDefinition = faDiagramProject;
  processEquipments: Array<IdbProcessEquipment>;
  contacts: Array<IdbContact>;
  faUser: IconDefinition = faUser;
  constructor(private processEquipmentIdbService: ProcessEquipmentIdbService, private contactIdbService: ContactIdbService,
    private facilityIdbService: FacilityIdbService
  ) {

  }

  ngOnInit() {
    let facility: IdbFacility = this.facilityIdbService.selectedFacility.getValue();
    this.processEquipments = this.processEquipmentIdbService.getFacilityProcessEquipment(facility.guid);
    this.contacts = this.contactIdbService.contacts.getValue();
  }
}
