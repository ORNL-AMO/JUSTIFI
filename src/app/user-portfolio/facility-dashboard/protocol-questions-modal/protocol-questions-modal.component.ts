import { Component, Input } from '@angular/core';
import { faFileExcel, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbFacility } from 'src/app/models/facility';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';
import { ProtocolQuestionsExcelWriterService } from 'src/app/shared/shared-services/protocol-questions-excel-writer.service';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-protocol-questions-modal',
  standalone: false,

  templateUrl: './protocol-questions-modal.component.html',
  styleUrl: './protocol-questions-modal.component.css'
})
export class ProtocolQuestionsModalComponent {

  @Input()
  selectedModule: string;

  displayProtocolQuestionsModal: boolean = false;
  displayProtocolQuestionsModalSub: Subscription;
  generateExcelSub: Subscription;
  facility: IdbFacility;
  energyEquipmentsSub: Subscription
  energyEquipments: Array<IdbEnergyEquipment>;
  processEquipmentSub: Subscription
  processEquipments: Array<IdbProcessEquipment>;

  isFacilitySelected: boolean = false;
  isIndustrialSystemSelected: boolean = false;
  isEndUseSelected: boolean = false;
  selectedChildrenIndustrialSys: Array<string> = [];
  selectedChildrenEndUse: Array<string> = [];
  energyEquipmentIds: Array<string> = [];
  processEquipmentIds: Array<string> = [];

  faFileExcel: IconDefinition = faFileExcel;

  constructor(
    private protocolQuestionsExcelWriterService: ProtocolQuestionsExcelWriterService,
    private sharedDataService: SharedDataService,
    private facilityIdbService: FacilityIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService,
  ) { }

  ngOnInit(): void {
    this.facility = this.facilityIdbService.selectedFacility.getValue();

    this.displayProtocolQuestionsModalSub = this.protocolQuestionsExcelWriterService.displayProtocolQuestionsModal.subscribe(value => {
      this.displayProtocolQuestionsModal = value;
    });

    this.generateExcelSub = this.sharedDataService.exportToExcel.subscribe(generateExcel => {
      if (generateExcel == true) {
        this.exportToExcel();
      }
    });

    this.energyEquipmentsSub = this.energyEquipmentIdbService.energyEquipments.subscribe(energyEquipments => {
      this.energyEquipments = energyEquipments.filter(equipment => {
        return equipment.facilityId == this.facility.guid;
      });
    });

    this.processEquipmentSub = this.processEquipmentIdbService.processEquipments.subscribe(processEquipments => {
      this.processEquipments = processEquipments.filter(equipment => {
        return equipment.facilityId == this.facility.guid;
      });
    });

    this.energyEquipmentIds = this.energyEquipments.map(equipment => equipment.guid);
    this.processEquipmentIds = this.processEquipments.map(equipment => equipment.guid);

    this.selectCheckBoxesBasedOnSelectedModule();
  }

  selectCheckBoxesBasedOnSelectedModule() {
    switch (this.selectedModule) {
      case 'facility':
        this.isFacilitySelected = true;
        break;
      case 'industrialSystem':
        this.isIndustrialSystemSelected = true;
        this.selectedChildrenIndustrialSys = [...this.energyEquipmentIds];
        break;
      case 'endUse':
        this.isEndUseSelected = true;
        this.selectedChildrenEndUse = [...this.processEquipmentIds];
        break;
    }
  }

  toggleParent(type: string) {
    switch (type) {
      case 'facility':
        break;
      case 'industrialSystem':
        this.selectedChildrenIndustrialSys = this.isIndustrialSystemSelected ? [...this.energyEquipmentIds] : [];
        break;
      case 'endUse':
        this.selectedChildrenEndUse = this.isEndUseSelected ? [...this.processEquipmentIds] : [];
        break;
    }
  }

  toggleChild(type: string, guid: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    let selectedArray: Array<string>;
    let childrenArray: Array<string>;
    let selectedParent: 'isIndustrialSystemSelected' | 'isEndUseSelected';

    if (type == 'industrialSystem') {
      selectedArray = this.selectedChildrenIndustrialSys;
      childrenArray = this.energyEquipmentIds;
      selectedParent = 'isIndustrialSystemSelected';
    } else {
      selectedArray = this.selectedChildrenEndUse;
      childrenArray = this.processEquipmentIds;
      selectedParent = 'isEndUseSelected';
    }

    if (isChecked) {
      selectedArray.push(guid);
    } else {
      const index = selectedArray.indexOf(guid);
      if (index !== -1) {
        selectedArray.splice(index, 1);
      }
    }

    this[selectedParent] = selectedArray.length === childrenArray.length;
  }

  ngOnDestroy(): void {
    if (this.displayProtocolQuestionsModalSub) {
      this.displayProtocolQuestionsModalSub.unsubscribe();
    }
    if (this.generateExcelSub) {
      this.generateExcelSub.unsubscribe();
    }
    if (this.energyEquipmentsSub) {
      this.energyEquipmentsSub.unsubscribe();
    }
  }

  closeExportModal() {
    this.protocolQuestionsExcelWriterService.displayProtocolQuestionsModal.next(false);
  }

  toggleExcelExport() {
    this.sharedDataService.exportToExcel.next(true);
  }

  exportToExcel() {
    this.protocolQuestionsExcelWriterService.exportProtocolQuestionsToExcel(this.facility, this.energyEquipments, this.processEquipments, this.isFacilitySelected, this.selectedChildrenIndustrialSys, this.selectedChildrenEndUse);
    this.sharedDataService.exportToExcel.next(false);
  }

  getButtonState(): boolean {
    if (this.isFacilitySelected || this.selectedChildrenIndustrialSys.length > 0 || this.selectedChildrenEndUse.length > 0) {
      return false;
    } else {
      return true;
    }
  }
}
