import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbCompany } from 'src/app/models/company';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbFacility } from 'src/app/models/facility';
import { FacilitySetupService } from 'src/app/setup-wizard/pre-visit/facility-setup/facility-setup.service';
import { PreAssessmentSetupService } from 'src/app/setup-wizard/pre-visit/pre-assessment-setup/pre-assessment-setup.service';
import { AssessmentEnergyOpportunitiesFormService } from '../../../setup-wizard/data-collection/on-site-assessment/assessment-energy-opportunities-form/assessment-energy-opportunities-form.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { FacilityEnergyEquipmentSetupService } from 'src/app/setup-wizard/pre-visit/facility-energy-equipment/facility-energy-equipment-setup.service';

@Component({
  selector: 'app-company-setup-form',
  templateUrl: './company-setup-form.component.html',
  styleUrl: './company-setup-form.component.css'
})
export class CompanySetupFormComponent {
  

  selectedCompany: IdbCompany;
  selectedCompanySub: Subscription;
  name: FormControl;
  energyUnit: FormControl;

  hasAssessments: boolean = false;
  energyUnitChange: boolean = false;

  companyAssessments: Array<IdbAssessment> = [];
  companyFacilities: Array<IdbFacility> = [];
  companyEnergyOpportunities: Array<IdbEnergyOpportunity> = [];
  companyEnergyEquipments: Array<IdbEnergyEquipment> = [];

  constructor(
    private companyIdbService: CompanyIdbService,
    private preAassessmentSetupService: PreAssessmentSetupService,
    private assessmentIdbService: AssessmentIdbService,
    private facilityIdbService: FacilityIdbService,
    private facilitySetupService: FacilitySetupService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private assessmentEnergyOpportunitiesFormService: AssessmentEnergyOpportunitiesFormService,
    private facilityEnergyEquipmentSetupService: FacilityEnergyEquipmentSetupService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService
  ) {

  }

  ngOnInit() {
    this.selectedCompanySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.selectedCompany = _company;
    });
    if (this.selectedCompany) {
      this.name = new FormControl(this.selectedCompany.generalInformation.name, [Validators.required]);
      this.energyUnit = new FormControl(this.selectedCompany.companyEnergyUnit, []); // Default value

      this.companyAssessments = this.assessmentIdbService.getByOtherGuid(this.selectedCompany.guid, 'company');
      if (this.companyAssessments.length > 0) {
        this.hasAssessments = true;
      }

      this.companyFacilities = this.facilityIdbService.getByOtherGuid(this.selectedCompany.guid, 'company');
      this.companyEnergyOpportunities = this.energyOpportunityIdbService.getByOtherGuid(this.selectedCompany.guid, 'company');
      this.companyEnergyEquipments = this.energyEquipmentIdbService.getByOtherGuid(this.selectedCompany.guid, 'company');
    }
  }


  ngOnDestroy() {
    this.selectedCompanySub.unsubscribe();
  }

  async saveUnitChanges() {
    this.energyUnitChange = true;
    await this.saveChanges();
    await this.preAassessmentSetupService.updateAssessmentEnergyUse(
      this.companyAssessments, this.energyUnit.value);
    await this.facilitySetupService.updateFacilityEnergyUse(
      this.companyFacilities, this.energyUnit.value);
    await this.assessmentEnergyOpportunitiesFormService.updateEnergyOpportunityEnergyUseFromCompany(
      this.companyEnergyOpportunities, this.energyUnit.value);
    await this.facilityEnergyEquipmentSetupService.updateEnergyEquipmentEnergyUse(
      this.companyEnergyEquipments, this.energyUnit.value);
  }

  async saveChanges() {
    this.selectedCompany = this.companyIdbService.selectedCompany.getValue();
    this.selectedCompany.generalInformation.name = this.name.value;
    this.selectedCompany.companyEnergyUnit = this.energyUnit.value;
    await this.companyIdbService.asyncUpdate(this.selectedCompany);
  }
}
