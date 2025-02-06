import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faChevronLeft, faCircle, faCircleCheck, faLink, faSave, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';

@Component({
  selector: 'app-associated-energy-equipment-modal',
  standalone: false,

  templateUrl: './associated-energy-equipment-modal.component.html',
  styleUrl: './associated-energy-equipment-modal.component.css'
})
export class AssociatedEnergyEquipmentModalComponent {
  @Input({ required: true })
  contextGuid: string;
  @Input({ required: true })
  itemContext: 'assessment' | 'endUse';
  @Input({ required: true })
  selectedEquipment: IdbEnergyEquipment;
  @Output('emitCancel')
  emitCancel: EventEmitter<boolean> = new EventEmitter();
  @Input({ required: true })
  facilityGuid: string;

  displayModal: boolean = false;
  energyEquipments: Array<IdbEnergyEquipment>;
  faSave: IconDefinition = faSave;
  faCircleCheck: IconDefinition = faCircleCheck;
  faChevronLeft: IconDefinition = faChevronLeft;
  faCircle: IconDefinition = faCircle;
  faLink: IconDefinition = faLink;

  constructor(
    private energyEquipmentIdbService: EnergyEquipmentIdbService
  ) {
  }

  ngOnInit() {
    this.energyEquipments = this.energyEquipmentIdbService.getByOtherGuid(this.facilityGuid, 'facility').map(equipment => {
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
    for (let i = 0; i < this.energyEquipments.length; i++) {
      await firstValueFrom(this.energyEquipmentIdbService.updateWithObservable(this.energyEquipments[i]));
    }
    await this.energyEquipmentIdbService.setEnergyEquipments();
    this.closeModal();
  }

  viewEquipment(equipment: IdbEnergyEquipment) {
    this.selectedEquipment = equipment;
  }

  async toggleActive(equipmentIndex: number) {
    if (this.itemContext == 'assessment') {
      if (this.energyEquipments[equipmentIndex].assessmentIds.includes(this.contextGuid)) {
        this.energyEquipments[equipmentIndex].assessmentIds = this.energyEquipments[equipmentIndex].assessmentIds.filter(id => {
          return id != this.contextGuid;
        });
      } else {
        this.energyEquipments[equipmentIndex].assessmentIds.push(this.contextGuid);
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
