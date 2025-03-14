import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { IconDefinition, faFileLines, faPlus, faSearchPlus, faTrash, faWeightHanging, faCalculator } from '@fortawesome/free-solid-svg-icons';
import { EnergyOpportunityType, FanOpportunities } from 'src/app/shared/constants/energyOpportunityOptions';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { getNewIdbNonEnergyBenefit, IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { firstValueFrom, Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { UtilityEnergyUse } from 'src/app/models/utilityEnergyUses';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { UtilityOptions } from 'src/app/shared/constants/utilityTypes';
import { UnitSettings } from 'src/app/models/unitSettings';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ConvertValue } from 'src/app/shared/conversions/convertValue';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { LocaleService } from '../../shared-services/locale.service';

@Component({
    selector: 'app-energy-opportunity-setup-form',
    templateUrl: './energy-opportunity-setup-form.component.html',
    styleUrl: './energy-opportunity-setup-form.component.css',
    standalone: false
})
export class EnergyOpportunitySetupFormComponent {
  @Input({ required: true })
  energyOpportunityGuid: string;
  @Output('emitInitialized')
  emitInitialized = new EventEmitter<boolean>();
  @Input()
  inWizard: boolean;


  energyOpportunity: IdbEnergyOpportunity;

  faFileLines: IconDefinition = faFileLines;
  faTrash: IconDefinition = faTrash;
  faSearchPlus: IconDefinition = faSearchPlus;
  faPlus: IconDefinition = faPlus;
  faWeightHanging: IconDefinition = faWeightHanging;
  faCalculator: IconDefinition = faCalculator;

  opportunityTypes: Array<EnergyOpportunityType> = [{ value: 'other', label: 'Other' }];
  displayDeleteModal: boolean = false;
  showAddNebDropdown: boolean = false;

  companySub: Subscription;
  companyEnergyUnit: string;

  assessmentSub: Subscription;
  assessmentEnergyUses: Array<UtilityEnergyUse>;

  facilitySub: Subscription;
  facilityUnitSettings: UnitSettings;

  convertValue = new ConvertValue();

  currencyCode: string;
  currencySub: Subscription;

  constructor(
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private dbChangesService: DbChangesService,
    private sharedDataService: SharedDataService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private companyIdbService: CompanyIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private facilityIdbService: FacilityIdbService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastNotificationService: ToastNotificationsService,
    private setupWizardService: SetupWizardService,
    private localeService: LocaleService,
  ) {
  }

  ngOnInit() {
    if (!this.inWizard) {
      this.activatedRoute.params.subscribe(params => {
        this.energyOpportunityGuid = params['id'];
        this.energyOpportunity = this.energyOpportunityIdbService.getByGuid(this.energyOpportunityGuid);
      });
    } else {
      this.energyOpportunity = this.energyOpportunityIdbService.getByGuid(this.energyOpportunityGuid);
    }

    if (!this.energyOpportunity.utilityCategory) {
      this.setUtilityCategory();
    }

    this.companySub = this.companyIdbService.selectedCompany.subscribe(company => {
      this.companyEnergyUnit = company.companyEnergyUnit;
    });
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(assessment => {
      this.assessmentEnergyUses = assessment.utilityEnergyUses;
    });
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(facility => {
      this.facilityUnitSettings = facility.unitSettings;
    });

    this.currencySub = this.localeService.currencyCode.subscribe(code => {
      this.currencyCode = code;
    });
  }

  ngOnDestroy() {
    this.companySub.unsubscribe();
    this.assessmentSub.unsubscribe();
    this.facilitySub.unsubscribe();
    this.currencySub.unsubscribe();
  }

  ngAfterViewInit() {
    this.emitInitialized.emit(true);
  }

  async deleteEnergyOpportunity() {
    await this.dbChangesService.deleteEnergyOpportunity(this.energyOpportunity)
    this.closeDeleteModal();
    this.toastNotificationService.showToast('Opportunity Deleted!', 'Energy efficiency opportunity removed from assessment.', 'bg-success', true, false);
    if (this.router.url.includes('portfolio')) {
      this.router.navigateByUrl('portfolio/assessment/' + this.energyOpportunity.assessmentId + '/energy-opportunities')
    }
  }

  async changeUtilityType() {
    let energyUse = this.assessmentEnergyUses.find(use =>
      use.utilityType === this.energyOpportunity.utilityType);
    this.energyOpportunity.energyUnit = energyUse.energyUnit;
    this.setUtilityCategory();
    await this.saveEnergyOpportunity();
  }

  setUtilityCategory() {
    if (this.energyOpportunity.utilityType === 'Water' || 
      this.energyOpportunity.utilityType === 'Waste Water') {
        this.energyOpportunity.utilityCategory = 'water';
    } else {
      this.energyOpportunity.utilityCategory = 'energy';
    }
  }

  async calculateCostSavings() {
    let trimmedType = this.energyOpportunity.utilityType.replace(/\s+/g, '');
    let camelCaseType = trimmedType.charAt(0).toLowerCase() + trimmedType.slice(1);
    if (this.facilityUnitSettings[`include${trimmedType}`]) {
      let useSavings = this.energyOpportunity.utilityCategory == 'water' ?
        this.energyOpportunity.waterSavings : this.energyOpportunity.energySavings;
      let costSavings = this.convertValue.convertValue(
        useSavings * this.facilityUnitSettings[`${camelCaseType}Price`],
        this.energyOpportunity.energyUnit,
        this.facilityUnitSettings[`${camelCaseType}Unit`]).convertedValue;
      this.energyOpportunity.costSavings = costSavings;
    }
    await this.saveEnergyOpportunity();
  }

  async saveEnergyOpportunity() {
    await this.energyOpportunityIdbService.asyncUpdate(this.energyOpportunity);
  }

  showDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  showSuggestedNEBs() {
    this.showAddNebDropdown = false;
    this.sharedDataService.displayAddNebsModal.next({
      assessmentId: this.energyOpportunity.assessmentId,
      energyOpportunityId: this.energyOpportunity.guid
    });
  }

  async addNEB() {
    this.showAddNebDropdown = false;
    let newNonEnergyBenefit: IdbNonEnergyBenefit = getNewIdbNonEnergyBenefit(this.energyOpportunity.userId, this.energyOpportunity.companyId, this.energyOpportunity.facilityId, this.energyOpportunity.assessmentId, this.energyOpportunity.guid, undefined, true);
    await firstValueFrom(this.nonEnergyBenefitsIdbService.addWithObservable(newNonEnergyBenefit));
    await this.nonEnergyBenefitsIdbService.setNonEnergyBenefits();
  }

  toggleAddNebDropdown() {
    this.showAddNebDropdown = !this.showAddNebDropdown;
  }

  isWaterRelatedUtilityType() {
    return 
  }

  isUtilityTracked(utilityType: string): boolean {
    let trimmed = utilityType.replace(/\s+/g, '');
    return this.facilityUnitSettings[`include${trimmed}`];
  }

  focusField(str: string){
    this.setupWizardService.focusedHelp.next(str);
  }
}
