import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnergyUnitOptions, MassUnitOptions, UnitOption, VolumeGasOptions, VolumeLiquidOptions } from '../../constants/unitOptions';
import { Subscription } from 'rxjs';
import { UnitSettings } from 'src/app/models/unitSettings';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { IconDefinition, faGear } from '@fortawesome/free-solid-svg-icons';
import { SharedSettingsFormsService } from '../shared-settings-forms.service';
import { PreAssessmentSetupService } from 'src/app/setup-wizard/pre-visit/pre-assessment-setup/pre-assessment-setup.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { UtilityOptions } from '../../constants/utilityTypes';
import { ConvertValue } from '../../conversions/convertValue';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { FacilityEnergyEquipmentSetupService } from 'src/app/setup-wizard/pre-visit/facility-energy-equipment-setup/facility-energy-equipment-setup.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { AssessmentEnergyOpportunitiesFormService } from 'src/app/setup-wizard/data-collection/on-site-assessment/assessment-energy-opportunities-form/assessment-energy-opportunities-form.service';

@Component({
  selector: 'app-units-form',
  templateUrl: './units-form.component.html',
  styleUrls: ['./units-form.component.css']
})
export class UnitsFormComponent implements OnInit, OnDestroy{

  faGear: IconDefinition = faGear;
  form: FormGroup;

  facility: IdbFacility;
  facilitySub: Subscription;

  companySub: Subscription;
  companyEnergyUnit: string;
  convertValue = new ConvertValue();

  facilityAssessments: Array<IdbAssessment> = [];
  hasAssessments: boolean = false;
  priceChanged: boolean = false;

  facilityEnergyEquipments: Array<IdbEnergyEquipment> = [];

  energyUnitOptions: Array<UnitOption> = EnergyUnitOptions;

  constructor(
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private sharedSettingsFormsService: SharedSettingsFormsService,
    private preAssessmentSetupService: PreAssessmentSetupService,
    private assessmentIdbService: AssessmentIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private facilityEnergyEquipmentSetupService: FacilityEnergyEquipmentSetupService,
  ) {
  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      if (!this.facility || (this.facility.guid != _facility.guid)) {
        //initialize form on facility change
        this.form = this.sharedSettingsFormsService.getUnitsForm(_facility.unitSettings);
      }
      this.facility = _facility;
      this.facilityAssessments = this.assessmentIdbService .getByOtherGuid(this.facility.guid, 'facility');
      if (this.facilityAssessments.length > 0) {
        this.hasAssessments = true;
      }
      this.facilityEnergyEquipments = this.energyEquipmentIdbService.getByOtherGuid(this.facility.guid, 'facility');
    });

    this.companySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.companyEnergyUnit = _company.companyEnergyUnit;
    });
  }

  ngOnDestroy() {
    if (this.facilitySub) {
      this.facilitySub.unsubscribe();
    }
    if (this.companySub) {
      this.companySub.unsubscribe();
    }
  }

  async savePriceChanges() {
    await this.saveChanges();
    this.priceChanged = true;
    await this.preAssessmentSetupService.updateAssessmentEnergyCost(
      this.facilityAssessments, this.facility.unitSettings);
  }

  async saveChanges() {
    this.facility.unitSettings = this.sharedSettingsFormsService.updateUnitSettingsFromForm(this.form, this.facility.unitSettings);
    this.calculate();
    await this.facilityIdbService.asyncUpdate(this.facility);
    this.priceChanged = false;
    this.facilityEnergyEquipmentSetupService.updateEnergyEquipmentEnergyUseByUtility(this.facilityEnergyEquipments, this.facility.unitSettings);
  }

  calculate() {
    let use = 0, cost = 0;
    UtilityOptions.forEach(option => {
      let utilityType = option.utilityType;
      let trimmedType = utilityType.replace(/\s+/g, ''); // Remove spaces
      let camelCaseType = trimmedType.charAt(0).toLowerCase() + trimmedType.slice(1);
      if (this.facility.unitSettings[`include${trimmedType}`]) {
        let convertedUse = 0;
        let selectedUnitOption = option.energyUnitOptions.find(
          _unitOption => _unitOption.value == this.facility.unitSettings[`${camelCaseType}Unit`]);
        if (option.isStandardEnergyUnit && selectedUnitOption.isStandard !== false) {
          // standard energy unit
          convertedUse = this.convertValue.convertValue(
            this.facility.unitSettings[`${camelCaseType}Use`],
            this.facility.unitSettings[`${camelCaseType}Unit`],
            this.companyEnergyUnit).convertedValue;
        } else {
          // non-standard energy unit
          convertedUse = this.convertValue.convertValue(
            this.facility.unitSettings[`${camelCaseType}Use`] *
            this.facility.unitSettings[`${camelCaseType}HHV`],
            this.facility.unitSettings[`${camelCaseType}EnergyUnit`],
            this.companyEnergyUnit).convertedValue;
        }
        use += convertedUse;
        cost += this.facility.unitSettings[`${camelCaseType}Use`] *
          this.facility.unitSettings[`${camelCaseType}Price`];
      }
    });
    this.facility.energyUse = use;
    this.facility.cost = cost;
  }

}
