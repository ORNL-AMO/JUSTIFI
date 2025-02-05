import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faChevronLeft, faCircle, faCircleCheck, faSave, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

@Component({
  selector: 'app-associated-process-equipment-modal',
  standalone: false,

  templateUrl: './associated-process-equipment-modal.component.html',
  styleUrl: './associated-process-equipment-modal.component.css'
})
export class AssociatedProcessEquipmentModalComponent {
  @Input({ required: true })
  contextGuid: string;
  @Input({ required: true })
  itemContext: 'energyOpportunity' | 'industrialSystem';
  @Input({ required: true })
  selectedEquipment: IdbProcessEquipment;
  @Output('emitCancel')
  emitCancel: EventEmitter<boolean> = new EventEmitter();
  @Input({ required: true })
  facilityGuid: string;

  displayModal: boolean = false;
  processEquipments: Array<IdbProcessEquipment>;
  faSave: IconDefinition = faSave;
  faCircleCheck: IconDefinition = faCircleCheck;
  faChevronLeft: IconDefinition = faChevronLeft;
  faCircle: IconDefinition = faCircle;

  constructor(
    private processEquipmentIdbService: ProcessEquipmentIdbService
  ) {
  }

  ngOnInit() {

    this.processEquipments = this.processEquipmentIdbService.getFacilityProcessEquipment(this.facilityGuid).map(equipment => {
      //need to use shallow copy
      return {
        ...equipment
      }
    });

    setTimeout(() => {
      this.displayModal = true;
    }, 100)
  }

  closeModal() {
    this.displayModal = false;
    this.emitCancel.emit(false);
  }

  async saveChanges() {
    for (let i = 0; i < this.processEquipments.length; i++) {
      await firstValueFrom(this.processEquipmentIdbService.updateWithObservable(this.processEquipments[i]));
    }
    await this.processEquipmentIdbService.setProcessEquipments();
    this.closeModal();
  }

  viewEquipment(equipment: IdbProcessEquipment) {
    this.selectedEquipment = equipment;
  }

  async toggleActive(equipmentIndex: number) {
    if (this.itemContext == 'energyOpportunity') {
      if (this.processEquipments[equipmentIndex].energyOpportunityIds.includes(this.contextGuid)) {
        this.processEquipments[equipmentIndex].energyOpportunityIds = this.processEquipments[equipmentIndex].energyOpportunityIds.filter(id => {
          return id != this.contextGuid;
        });
      } else {
        this.processEquipments[equipmentIndex].energyOpportunityIds.push(this.contextGuid);
      }
    }
    //TODO: end use
    // else if (this.contactContext == 'processEquipment') {
    //   if (this.contacts[contactIndex].processEquipmentIds.includes(this.contextGuid)) {
    //     this.contacts[contactIndex].processEquipmentIds = this.contacts[contactIndex].processEquipmentIds.filter(id => {
    //       return id != this.contextGuid;
    //     });
    //   } else {
    //     this.contacts[contactIndex].processEquipmentIds.push(this.contextGuid);
    //   }
    // }
  }
}
