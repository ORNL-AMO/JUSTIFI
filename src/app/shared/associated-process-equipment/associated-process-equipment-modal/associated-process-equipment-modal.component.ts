import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faChevronLeft, faCircle, faCircleCheck, faLink, faSave, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { first, firstValueFrom } from 'rxjs';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';
import * as _ from 'lodash';

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
  itemContext: 'energyOpportunity' | 'energyEquipment' | 'processEquipment' | 'assessment';
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
  faLink: IconDefinition = faLink;

  energyEquipment: IdbEnergyEquipment
  constructor(
    private processEquipmentIdbService: ProcessEquipmentIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService
  ) {
  }

  ngOnInit() {
    this.processEquipments = this.processEquipmentIdbService.getFacilityProcessEquipment(this.facilityGuid).map(equipment => {
      //need to use deep copy
      return _.cloneDeep(equipment);
    });
    //don't link to self
    if (this.itemContext == 'processEquipment') {
      this.processEquipments = this.processEquipments.filter(equipment => {
        return equipment.guid != this.contextGuid;
      })
    }

    if (this.itemContext == 'energyEquipment') {
      this.energyEquipment = this.energyEquipmentIdbService.getByGuid(this.contextGuid)
    }

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
      //update associated energy equipment
      if (this.itemContext == 'energyEquipment') {
        //equipment linked
        if (this.processEquipments[i].energyEquipmentIds.includes(this.contextGuid)) {
          //no link exists add
          if (!this.energyEquipment.processEquipmentIds.includes(this.processEquipments[i].guid)) {
            this.energyEquipment.processEquipmentIds.push(this.processEquipments[i].guid);
          }
        } else {
          //equipment link removed
          if (this.energyEquipment.processEquipmentIds.includes(this.processEquipments[i].guid)) {
            this.energyEquipment.processEquipmentIds = this.energyEquipment.processEquipmentIds.filter(guid => {
              return this.processEquipments[i].guid != guid;
            })
          }
        }
      }
    }
    if (this.itemContext == 'energyEquipment') {
      await this.energyEquipmentIdbService.asyncUpdate(this.energyEquipment);
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
    } else if (this.itemContext == 'energyEquipment') {
      if (this.processEquipments[equipmentIndex].energyEquipmentIds.includes(this.contextGuid)) {
        this.processEquipments[equipmentIndex].energyEquipmentIds = this.processEquipments[equipmentIndex].energyEquipmentIds.filter(id => {
          return id != this.contextGuid;
        });
      } else {
        this.processEquipments[equipmentIndex].energyEquipmentIds.push(this.contextGuid);
      }
    } else if (this.itemContext == 'assessment') {
      if (this.processEquipments[equipmentIndex].assessmentIds.includes(this.contextGuid)) {
        this.processEquipments[equipmentIndex].assessmentIds = this.processEquipments[equipmentIndex].assessmentIds.filter(id => {
          return id != this.contextGuid;
        });
      } else {
        this.processEquipments[equipmentIndex].assessmentIds.push(this.contextGuid);
      }
    }
  }
}
