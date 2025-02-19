import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faChevronLeft, faCircle, faCircleCheck, faLink, faSave, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

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
  itemContext: 'assessment' | 'processEquipment' | 'energyEquipment' | 'energyOpportunity';
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
  companyEnergyUnit: string;

  processEquipment: IdbProcessEquipment;
  constructor(
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private companyIdbService: CompanyIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService
  ) {
  }

  ngOnInit() {
    this.companyEnergyUnit = this.companyIdbService.selectedCompany.getValue().companyEnergyUnit;
    this.energyEquipments = this.energyEquipmentIdbService.getByOtherGuid(this.facilityGuid, 'facility').map(equipment => {
      //need to use shallow copy
      return {
        ...equipment
      }
    });
    if (this.itemContext == 'energyEquipment') {
      this.energyEquipments = this.energyEquipments.filter(equipment => {
        return equipment.guid != this.contextGuid
      });
    }

    if (this.itemContext == 'processEquipment') {
      this.processEquipment = this.processEquipmentIdbService.getByGuid(this.contextGuid);
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
    for (let i = 0; i < this.energyEquipments.length; i++) {
      await firstValueFrom(this.energyEquipmentIdbService.updateWithObservable(this.energyEquipments[i]));
      //update associated energy equipment
      if (this.itemContext == 'processEquipment') {
        //equipment linked
        if (this.energyEquipments[i].processEquipmentIds.includes(this.contextGuid)) {
          //no link exists add
          if (!this.processEquipment.energyEquipmentIds.includes(this.energyEquipments[i].guid)) {
            this.processEquipment.energyEquipmentIds.push(this.energyEquipments[i].guid);
          }
        } else {
          //equipment link removed
          if (this.processEquipment.energyEquipmentIds.includes(this.energyEquipments[i].guid)) {
            this.processEquipment.energyEquipmentIds = this.processEquipment.energyEquipmentIds.filter(guid => {
              return this.energyEquipments[i].guid != guid;
            })
          }
        }
      }
    }
    if (this.itemContext == 'processEquipment') {
      await this.processEquipmentIdbService.asyncUpdate(this.processEquipment);
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
    else if (this.itemContext == 'energyEquipment') {
      if (this.energyEquipments[equipmentIndex].energyEquipmentIds.includes(this.contextGuid)) {
        this.energyEquipments[equipmentIndex].energyEquipmentIds = this.energyEquipments[equipmentIndex].energyEquipmentIds.filter(id => {
          return id != this.contextGuid;
        });
      } else {
        this.energyEquipments[equipmentIndex].energyEquipmentIds.push(this.contextGuid);
      }
    }
    else if (this.itemContext == 'processEquipment') {
      if (this.energyEquipments[equipmentIndex].processEquipmentIds.includes(this.contextGuid)) {
        this.energyEquipments[equipmentIndex].processEquipmentIds = this.energyEquipments[equipmentIndex].processEquipmentIds.filter(id => {
          return id != this.contextGuid;
        });
      } else {
        this.energyEquipments[equipmentIndex].processEquipmentIds.push(this.contextGuid);
      }
    }
    else if (this.itemContext == 'energyOpportunity') {
      if (this.energyEquipments[equipmentIndex].energyOpportunityIds.includes(this.contextGuid)) {
        this.energyEquipments[equipmentIndex].energyOpportunityIds = this.energyEquipments[equipmentIndex].energyOpportunityIds.filter(id => {
          return id != this.contextGuid;
        });
      } else {
        this.energyEquipments[equipmentIndex].energyOpportunityIds.push(this.contextGuid);
      }
    }
  }
}
