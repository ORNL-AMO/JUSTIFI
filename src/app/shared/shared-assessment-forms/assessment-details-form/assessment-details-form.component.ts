import { Component, Input } from '@angular/core';
import { IdbAssessment } from 'src/app/models/assessment';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { IconDefinition, faContactBook, faUser, faIndustry } from '@fortawesome/free-solid-svg-icons';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { AssessmentOptions, AssessmentType, AssessmentTypes } from 'src/app/shared/constants/assessmentTypes';
import { EnergyUnitOptions, UnitOption } from 'src/app/shared/constants/unitOptions';
import { UtilityOptions } from 'src/app/shared/constants/utilityTypes';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { UtilityEnergyUse } from 'src/app/models/utilityEnergyUses';
import { UnitSettings } from 'src/app/models/unitSettings';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ConvertValue } from 'src/app/shared/conversions/convertValue';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { AssessmentEnergyOpportunitiesFormService } from '../../../setup-wizard/data-collection/on-site-assessment/assessment-energy-opportunities-form/assessment-energy-opportunities-form.service';
import { Router } from '@angular/router';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { LocaleService } from '../../shared-services/locale.service';
import { updateAssessmentUtilityUseCostSavings } from '../../reports/calculations/utilityCalculation';

@Component({
    selector: 'app-assessment-details-form',
    templateUrl: './assessment-details-form.component.html',
    styleUrl: './assessment-details-form.component.css',
    standalone: false
})
export class AssessmentDetailsFormComponent {
  @Input()
  isDisabled: boolean;
  @Input()
  inPreAssessment: boolean;

  faUser: IconDefinition = faUser;
  faContactBook: IconDefinition = faContactBook;
  faIndustry: IconDefinition = faIndustry;

  assessment: IdbAssessment;
  assessmentSub: Subscription;
  isFormChange: boolean = false;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;

  energyEquipmentOptions: Array<IdbEnergyEquipment>;
  energyEquipmentSub: Subscription;

  assessmentTypes: Array<AssessmentType> = AssessmentTypes;
  energyUnitOptions: Array<UnitOption> = EnergyUnitOptions;

  companySub: Subscription;
  companyEnergyUnit: string;
  facilitySub: Subscription;
  facilityUnitSettings: UnitSettings;

  convertValue = new ConvertValue();

  assessmentEnergyOpportunities: Array<IdbEnergyOpportunity>;
  trackedEnergyUtilities: Array<UtilityEnergyUse>;
  numberOfTrackedEnergyUtilities: number = 0;
  trackedEnergyUnit: string;
  trackedWaterUnit: string = 'gal';

  currencyCode: string;
  currencySub: Subscription;

  constructor(
    private assessmentIdbService: AssessmentIdbService,
    private contactIdbService: ContactIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private assessmentEnergyOpportunitiesFormService: AssessmentEnergyOpportunitiesFormService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private router: Router,
    private localeService: LocaleService,

  ) { }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      if (!this.isFormChange) {
        this.assessment = _assessment;
      } else {
        this.isFormChange = false;
      }
    });

    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.contacts = _contacts;
    });

    this.energyEquipmentSub = this.energyEquipmentIdbService.energyEquipments.subscribe(_energyEquipment => {
      this.energyEquipmentOptions = _energyEquipment;
    });

    this.companySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.companyEnergyUnit = _company.companyEnergyUnit;
    });

    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      this.facilityUnitSettings = _facility.unitSettings;
    });

    this.currencySub = this.localeService.currencyCode.subscribe(code => {
      this.currencyCode = code;
    });
  }

  ngOnDestroy() {
    this.contactsSub.unsubscribe();
    this.assessmentSub.unsubscribe();
    this.energyEquipmentSub.unsubscribe();
    this.facilitySub.unsubscribe();
    this.companySub.unsubscribe();
    this.currencySub.unsubscribe();
  }

  async assessmentTypeChange() {
    let utilityTypes = AssessmentOptions.find(
      _assessmentOption => _assessmentOption.assessmentType == this.assessment.assessmentType)?.utilityTypes || [];
    this.assessment.utilityTypes = utilityTypes; // track all utility types
    this.updateAssessmentUtilityCategory();
    await this.calculateUtilityUseCostSavings();
  }

  updateAssessmentUtilityCategory() {
    this.assessment.utilityCategory = 'energy';
    for (let utilityType of this.assessment.utilityTypes) {
      if (utilityType == 'Water' || utilityType == 'Waste Water') {
        let use = this.assessment.utilityEnergyUses.find(
          _energyUse => _energyUse.utilityType == utilityType);
        if (use && use.include) {
          this.assessment.utilityCategory = 'water';
          break;
        }
      }
    }
  }

  updateEnergyOpportunities() {
    this.assessmentEnergyOpportunities = this.energyOpportunityIdbService.getByOtherGuid(
      this.assessment.guid, 'assessment');
    this.assessmentEnergyOpportunitiesFormService.updateEnergyOpportunityFromAssessment(
      this.assessmentEnergyOpportunities, this.assessment.utilityEnergyUses);
  }

  async calculateUtilityUseCostSavings() {
    this.updateEnergyOpportunities();
    this.assessment = updateAssessmentUtilityUseCostSavings(this.assessment, this.facilityUnitSettings, this.companyEnergyUnit);
    await this.saveChanges();
  }

  async saveChanges() {
    this.isFormChange = true;
    await this.assessmentIdbService.asyncUpdate(this.assessment);
    // update the unit for energy savings unit
    this.trackedEnergyUtilities = this.assessment.utilityEnergyUses.filter(
      _energyUse =>
        _energyUse.include && 
        _energyUse.utilityType !== 'Water' 
        && _energyUse.utilityType !== 'Waste Water');
    this.numberOfTrackedEnergyUtilities = this.trackedEnergyUtilities.length;
    if (this.numberOfTrackedEnergyUtilities == 1) {
      let utilityEnergyUse = this.trackedEnergyUtilities[0];
      let selectedUtilityOption = UtilityOptions.find(
        _option => _option.utilityType == utilityEnergyUse.utilityType);
      let selectedUnitOption = selectedUtilityOption.energyUnitOptions.find(
        _unitOption => _unitOption.value == utilityEnergyUse.energyUnit);
      // calculate use
      if (selectedUtilityOption.isStandardEnergyUnit
        && selectedUnitOption?.isStandard !== false) {
        this.trackedEnergyUnit = utilityEnergyUse.energyUnit;
      } else {
        this.trackedEnergyUnit = utilityEnergyUse.energyUnitStandard;
      }
    }
  }

  goToFacilitySetup() {
    let onsiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('/setup-wizard/pre-visit/' + onsiteVisit.guid + '/facility-setup');
  }
}
