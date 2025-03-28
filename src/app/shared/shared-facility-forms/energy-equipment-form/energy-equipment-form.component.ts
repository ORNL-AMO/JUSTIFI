import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faContactBook, faFilePen, faTrash, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
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
import { Energy2PowerUnitMap, EnergyUnitOptions, ProcessCoolingUnitOptions, UnitOption, VolumeGasOptions, VolumeLiquidOptions } from 'src/app/shared/constants/unitOptions';
import { UtilityOption, UtilityOptions, UtilityType, UtilityTypes } from 'src/app/shared/constants/utilityTypes';
import { ConvertValue } from 'src/app/shared/conversions/convertValue';
import { SharedDataService } from '../../shared-services/shared-data.service';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { BootstrapService } from '../../shared-services/bootstrap.service';
import { power } from '../../conversions/definitions/power';

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
  faFilePen: IconDefinition = faFilePen;

  equipmentTypes: Array<EquipmentType> = EquipmentTypes;
  equipmentTypeOptions: Array<{
    equipmentType: EquipmentType,
    utilityTypes: Array<UtilityType>,
    defaultUnit: string
  }> = EquipmentTypeOptions;
  utilityOptions: Array<UtilityOption> = UtilityOptions;

  fuelEnergyUnitOptions: Array<UnitOption> = EnergyUnitOptions;

  processCoolingUnitOptions: Array<UnitOption> = ProcessCoolingUnitOptions;

  convertValue: ConvertValue = new ConvertValue();

  energyEquipment: IdbEnergyEquipment
  displayDeleteModal: boolean = false;
  contacts: Array<IdbContact>;
  contactSub: Subscription;

  companySub: Subscription;
  companyEnergyUnit: string;
  facilitySub: Subscription;
  facilityUnitSettings: UnitSettings;

  inPortfolio: boolean = false;

  isAutoCalculateAvailable: {[key: string]: boolean} = {
    'Other Fuels': true,
    'Steam': true,
    'Compressed Air': true,
  };

  
  heatingValueLabel: {[key: string]: string} = {
    'Other Fuels': 'Higher Heating Value',
    'Steam': 'Enthalpy',
    'Compressed Air': 'Specific Power',
  };

  collapseEnergyDetails: boolean = true;
  constructor(private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private dbChangesService: DbChangesService,
    private contactIdbService: ContactIdbService,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private activatedRoute: ActivatedRoute,
    private sharedDataService: SharedDataService,
    private toastNotificationService: ToastNotificationsService,
    private router: Router,
    private setupWizardService: SetupWizardService,
    private bootstrapService: BootstrapService
  ) { }

  ngOnInit() {
    this.inPortfolio = (this.router.url.includes('setup-wizard') == false);
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
    this.focusField(undefined);
    this.contactSub.unsubscribe();
    this.companySub.unsubscribe();
    this.facilitySub.unsubscribe();
  }

  async industrialSystemChange() {
    let _utilityTypes = this.equipmentTypeOptions.find(
      option => option.equipmentType === this.energyEquipment.equipmentType
    )?.utilityTypes || [];
    this.energyEquipment.utilityType = _utilityTypes[0]; // Set to first utility type
    await this.utilityTypeChange('default');
  }

  async utilityTypeChange(mode: 'default' | 'normal') {
    // update energy unit to facility or company settings
    const facilityUtilityEnergyUnit = this.getUtilityEnergyUnitFromFacility();
    if (facilityUtilityEnergyUnit) {
      this.energyEquipment.facilityUtilityUnit = facilityUtilityEnergyUnit;
      
    } else {
      this.energyEquipment.facilityUtilityUnit = this.companyEnergyUnit;
    }

    // update size unit
    if (this.energyEquipment.equipmentType === 'Process Cooling') { // Process Cooling unit changes
      this.energyEquipment.sizeUnit = this.processCoolingUnitOptions[0].value;
    } else {
      if (mode === 'default') { // default unit for system type change
        this.energyEquipment.sizeUnit = this.equipmentTypeOptions.find(
          option => option.equipmentType === this.energyEquipment.equipmentType
        )?.defaultUnit || 'kW'; // Set to default unit
      } else if (mode === 'normal') { // normal unit for utility type change
        // update power unit to corresponding energy unit
        const powerUnit = Energy2PowerUnitMap[facilityUtilityEnergyUnit];
        this.energyEquipment.sizeUnit = powerUnit || 'kW';
      }
    }
    
    await this.updateEnergyCalculations();
  }

  async updateEnergyCalculations() {
    // update consumption rate unit
    if (this.isAutoCalculateAvailable[this.energyEquipment.utilityType]) {
      const utilityOption = this.utilityOptions.find(
        _option => _option.utilityType == this.energyEquipment.utilityType);
      let rateUnitOptions = utilityOption.consumptionRateUnit || [];
      const rateUnitValues = rateUnitOptions.map(_unitOption => _unitOption.value);
      // Set to first unit if undefined or not in the list
      if (!this.energyEquipment.fuelVolumeUnit || !rateUnitValues.includes(this.energyEquipment.fuelVolumeUnit)) {
        this.energyEquipment.fuelVolumeUnit = rateUnitValues?.[0] || 'gal';
      }
    }
    this.autoCalculateFuelPower();
    await this.calculateAnnualEnergyUse();
  }

  autoCalculateFuelPower() {
    if (this.isAutoCalculateAvailable[this.energyEquipment.utilityType] && this.energyEquipment.autoCalculate) {
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

  getUtilityEnergyUnitFromFacility(): string | null {
    const utilityType = this.energyEquipment.utilityType;
    const trimmedType = utilityType.replace(/\s+/g, '');
    const camelCaseType = trimmedType.charAt(0).toLowerCase()
      + trimmedType.slice(1); // Lowercase first letter
    if (this.facilityUnitSettings[`include${trimmedType}`]) {
      let selectedUtilityOption = this.utilityOptions.find(
        _option => _option.utilityType == utilityType);
      let selectedUnitOption = selectedUtilityOption.energyUnitOptions.find(
        _unitOption => _unitOption.value == this.energyEquipment.facilityUtilityUnit);
      if (selectedUtilityOption.isStandardEnergyUnit
        && selectedUnitOption.isStandard !== false) { // Standard unit
        return this.facilityUnitSettings[`${camelCaseType}Unit`];
      } else { // Non-standard unit
        return this.facilityUnitSettings[`${camelCaseType}EnergyUnit`];
      }
    } else {
      return null;
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

  focusField(str: string){
    this.setupWizardService.focusedHelp.next(str);
  }

  toggleBsEnergyDetails() {
    this.bootstrapService.bsCollapse('#energyDetails');
    this.collapseEnergyDetails = !this.collapseEnergyDetails;
  }
}