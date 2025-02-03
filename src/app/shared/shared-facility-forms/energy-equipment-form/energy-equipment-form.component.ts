import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faContactBook, faTrash, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { UnitSettings } from 'src/app/models/unitSettings';
import { EquipmentType, EquipmentTypeOptions, EquipmentTypes } from 'src/app/shared/constants/equipmentTypes';
import { EnergyUnitOptions, ProcessCoolingUnitOptions, UnitOption, VolumeGasOptions, VolumeLiquidOptions } from 'src/app/shared/constants/unitOptions';
import { UtilityOption, UtilityOptions, UtilityType, UtilityTypes } from 'src/app/shared/constants/utilityTypes';
import { ConvertValue } from 'src/app/shared/conversions/convertValue';
import { SharedDataService } from '../../shared-services/shared-data.service';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';

@Component({
    selector: 'app-energy-equipment-form',
    templateUrl: './energy-equipment-form.component.html',
    styleUrl: './energy-equipment-form.component.css',
    standalone: false
})
export class EnergyEquipmentFormComponent {
  @Input({ required: true })
  energyEquipmentGuid: string;
  @Output('emitInitialized')
  emitInitialized = new EventEmitter<boolean>();

  faTrash: IconDefinition = faTrash;
  faUser: IconDefinition = faUser;
  faContactBook: IconDefinition = faContactBook;

  equipmentTypes: Array<EquipmentType> = EquipmentTypes;
  equipmentTypeOptions: Array<{
    equipmentType: EquipmentType,
    utilityTypes: Array<UtilityType>,
    defaultUnit: string
  }> = EquipmentTypeOptions;
  utilityOptions: Array<UtilityOption> = UtilityOptions;

  fuelVolumeUnitOptions: Array<UnitOption> = [...VolumeLiquidOptions, ...VolumeGasOptions];
  fuelEnergyUnitOptions: Array<UnitOption> = EnergyUnitOptions;

  processCoolingUnitOptions: Array<UnitOption> = ProcessCoolingUnitOptions

  convertValue: ConvertValue = new ConvertValue();

  energyEquipment: IdbEnergyEquipment
  displayDeleteModal: boolean = false;
  contacts: Array<IdbContact>;
  contactSub: Subscription;

  companySub: Subscription;
  companyEnergyUnit: string;
  facilitySub: Subscription;
  facilityUnitSettings: UnitSettings;

  constructor(private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private dbChangesService: DbChangesService,
    private contactIdbService: ContactIdbService,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private activatedRoute: ActivatedRoute,
    private sharedDataService: SharedDataService,
    private toastNotificationService: ToastNotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.energyEquipmentGuid) {
      this.activatedRoute.params.subscribe(params => {
        this.energyEquipmentGuid = params['id'];
        this.energyEquipment = this.energyEquipmentIdbService.getByGuid(this.energyEquipmentGuid);
      });
    } else {
      this.energyEquipment = this.energyEquipmentIdbService.getByGuid(this.energyEquipmentGuid);
    }

    this.contactSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.contacts = _contacts;
    });

    this.companySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.companyEnergyUnit = _company.companyEnergyUnit;
    });

    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      this.facilityUnitSettings = _facility.unitSettings;
    });
  }

  ngOnDestroy() {
    this.contactSub.unsubscribe();
    this.companySub.unsubscribe();
    this.facilitySub.unsubscribe();
  }

  async industrialSystemChange() {
    let _utilityTypes = this.equipmentTypeOptions.find(
      option => option.equipmentType === this.energyEquipment.equipmentType
    )?.utilityTypes || [];
    this.energyEquipment.utilityType = _utilityTypes[0]; // Set to first utility type
    this.energyEquipment.sizeUnit = this.equipmentTypeOptions.find(
      option => option.equipmentType === this.energyEquipment.equipmentType
    )?.defaultUnit || 'kW'; // Set to default unit
    await this.utilityTypeChange();
  }

  async utilityTypeChange() {
    if (this.energyEquipment.equipmentType === 'Process Cooling') { // Process Cooling unit changes
      this.energyEquipment.sizeUnit = this.processCoolingUnitOptions[0].value;
    }
    this.updateFacilityUtilityUnit();
    await this.updateEnergyCalculations();
  }

  async updateEnergyCalculations() {
    this.autoCalculateFuelPower();
    await this.calculateAnnualEnergyUse();
  }

  autoCalculateFuelPower() {
    if (this.energyEquipment.utilityType === 'Other Fuels' && this.energyEquipment.autoCalculate) {
      let result = this.energyEquipment.fuelConsumption * this.energyEquipment.fuelHHV;
      let unitConv = this.convertValue.convertValue(1, this.energyEquipment.fuelEnergyUnit).convertedValue /
        this.convertValue.convertValue(1, this.energyEquipment.sizeUnit).convertedValue / 3600; // J/hr to W
      result = result * unitConv;
      this.energyEquipment.size = Number(result.toFixed(3)); // Round to 3 decimal places
    }
  }

  convertSize(): number {
    let unitConv = this.convertValue.convertValue(1, this.energyEquipment.sizeUnit).convertedValue * 3600; // Wh to J
    unitConv = unitConv / this.convertValue.convertValue(1, this.companyEnergyUnit).convertedValue;
    return this.energyEquipment.size * unitConv;
  }

  async calculateAnnualEnergyUse() {
    let convertedSize = this.convertSize();
    this.energyEquipment.annualEnergyUse = convertedSize * this.energyEquipment.operatingHours *
      (this.energyEquipment.loadFactor / 100) / (this.energyEquipment.efficiency / 100) * this.energyEquipment.numberOfEquipment;
    if (!this.energyEquipment.annualEnergyUse || this.energyEquipment.annualEnergyUse === Infinity) {
      this.energyEquipment.annualEnergyUse = 0;
    }
    this.convertAnnualEnergyUse();
    await this.saveChanges();
  }

  updateFacilityUtilityUnit() {
    const utilityType = this.energyEquipment.utilityType.replace(/\s+/g, '');
    const camelCaseType = utilityType.charAt(0).toLowerCase()
      + utilityType.slice(1); // Lowercase first letter
    if (this.facilityUnitSettings[`include${camelCaseType}`]) {
      let selectedUtilityOption = this.utilityOptions.find(
        _option => _option.utilityType == utilityType);
      let selectedUnitOption = selectedUtilityOption.energyUnitOptions.find(
        _unitOption => _unitOption.value == this.energyEquipment.facilityUtilityUnit);
      if (selectedUtilityOption.isStandardEnergyUnit
        && selectedUnitOption.isStandard !== false) { // Standard unit
        this.energyEquipment.facilityUtilityUnit = this.facilityUnitSettings[`${camelCaseType}Unit`];
      } else { // Non-standard unit
        this.energyEquipment.facilityUtilityUnit = this.facilityUnitSettings[`${camelCaseType}EnergyUnit`];
      }
    } else {
      this.energyEquipment.facilityUtilityUnit = this.companyEnergyUnit; // Default to company unit
    }
  }

  convertAnnualEnergyUse() {
    this.energyEquipment.annualEnergyUseByUtility = this.convertValue.convertValue(
      this.energyEquipment.annualEnergyUse,
      this.companyEnergyUnit,
      this.energyEquipment.facilityUtilityUnit
    ).convertedValue;
    if (!this.energyEquipment.annualEnergyUseByUtility ||
      this.energyEquipment.annualEnergyUseByUtility === Infinity) {
      this.energyEquipment.annualEnergyUseByUtility = 0;
    }
  }

  ngAfterViewInit() {
    //emit after initialized. 
    //When adding new energy equipment this will trigger the form to open
    this.emitInitialized.emit(true);
  }

  async saveChanges() {
    await this.energyEquipmentIdbService.asyncUpdate(this.energyEquipment);
  }

  openDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  async deleteEquipment() {
    await this.dbChangesService.deleteEnergyEquipment(this.energyEquipment);
    this.toastNotificationService.showToast("Equipment Deleted!", "Equipment item has been removed from the facility inventory.", 'bg-success', true, false);
    if (this.router.url.includes('portfolio')) {
      this.router.navigateByUrl('/portfolio/facility/' + this.energyEquipment.facilityId + '/system-inventory');
    }
    this.closeDeleteModal();
  }

  openContactModal(viewContact: IdbContact) {
    this.sharedDataService.displayContactModal.next({ context: 'energyEquipment', viewContact: viewContact, contextGuid: this.energyEquipment.guid, companyId: this.energyEquipment.companyId });
  }

  closeContactModal() {
    this.sharedDataService.displayContactModal.next(undefined);
  }
}