import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { faCheck, faChevronDown, faChevronUp, faMagnifyingGlass, faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import * as _ from 'lodash';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbCompany } from 'src/app/models/company';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { KeyPerformanceIndicatorOption, KeyPerformanceIndicatorOptions, KeyPerformanceIndicatorValue } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';
import { KeyPerformanceMetric, KeyPerformanceMetricOption, KeyPerformanceMetricOptions, KeyPerformanceMetricValue } from 'src/app/shared/constants/keyPerformanceMetrics';
import { NebOption, NebOptions } from 'src/app/shared/constants/nonEnergyBenefitOptions';

@Component({
  selector: 'app-nebs-database-table',
  templateUrl: './nebs-database-table.component.html',
  styleUrl: './nebs-database-table.component.css'
})
export class NebsDatabaseTableComponent {
  @Input()
  inAddModal: boolean;
  @Output('emitSelectedNebs')
  emitSelectedNebs: EventEmitter<Array<NebOption>> = new EventEmitter();

  faChevronUp: IconDefinition = faChevronUp;
  faChevronDown: IconDefinition = faChevronDown;
  faPlus: IconDefinition = faPlus;
  faCheck: IconDefinition = faCheck;
  faMagnifyingGlass: IconDefinition = faMagnifyingGlass;

  nebOptions: Array<NebOption>;

  orderByDir: 'asc' | 'desc' = 'asc';
  nebSearchStr: string = '';
  kpiValue: KeyPerformanceIndicatorValue;
  kpmValue: KeyPerformanceMetricValue;
  keyPerformanceIndicatorOptions: Array<KeyPerformanceIndicatorOption> = KeyPerformanceIndicatorOptions;
  keyPerformanceMetricOptions: Array<KeyPerformanceMetricOption> = [];

  companyTrackedKpis: Array<KeyPerformanceIndicatorValue> = [];
  companyTrackedKpms: Array<KeyPerformanceMetricValue> = [];

  constructor(private cd: ChangeDetectorRef, private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private companyIdbService: CompanyIdbService,
    private setupWizardService: SetupWizardService,
    private assessmentIdbService: AssessmentIdbService,
    private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService
  ) { }

  ngOnInit() {
    if (this.inAddModal) {
      this.setCompanyKpis();
    }
    this.setNebOptions();
    this.keyPerformanceIndicatorOptions = _.orderBy(KeyPerformanceIndicatorOptions, (option: KeyPerformanceIndicatorOption) => {
      return option.label;
    }, 'asc');
    this.setKpmOptions();
  }

  setKpmOptions() {
    if (this.kpiValue) {
      this.keyPerformanceMetricOptions = KeyPerformanceMetricOptions.filter(option => {
        return option.kpiValue == this.kpiValue;
      });
      this.keyPerformanceMetricOptions = _.orderBy(this.keyPerformanceMetricOptions, (option: KeyPerformanceMetricOption) => {
        return option.label;
      }, 'asc')
    } else {
      this.keyPerformanceMetricOptions = _.orderBy(KeyPerformanceMetricOptions, (option: KeyPerformanceMetricOption) => {
        return option.label;
      }, 'asc');
    }
    let selectedIndex: number = this.keyPerformanceMetricOptions.findIndex(option => {
      return option.value == this.kpmValue;
    })
    if (selectedIndex == -1) {
      this.kpmValue = undefined;
    }
    this.cd.detectChanges();
  }



  setNebOptions() {
    let nebOptionsList: Array<NebOption> = new Array();
    if (!this.inAddModal) {
      nebOptionsList = NebOptions.map(option => {
        return option;
      });
    } else {
      let modalData: { assessmentId: string, energyOpportunityId: string } = this.setupWizardService.displayAddNebsModal.getValue();
      let assessment: IdbAssessment = this.assessmentIdbService.getByGuid(modalData.assessmentId);
      let selectedNebs: Array<IdbNonEnergyBenefit>;
      if (modalData.energyOpportunityId) {
        selectedNebs = this.nonEnergyBenefitIdbService.getEnergyOpportunityNonEnergyBenefits(modalData.energyOpportunityId);
      } else {
        selectedNebs = this.nonEnergyBenefitIdbService.getAssessmentNonEnergyBenefits(assessment.guid);
      }
      let selectedOptionValues = selectedNebs.map(option => {
        return option.nebOptionValue;
      })
      NebOptions.forEach(option => {
        if (!selectedOptionValues.includes(option.optionValue)) {
          nebOptionsList.push(option);
        }
      });
    }
    this.nebOptions = nebOptionsList;
  }

  toggleOrderBy() {
    if (this.orderByDir == 'asc') {
      this.orderByDir = 'desc';
    } else {
      this.orderByDir = 'asc';
    }
  }

  setCompanyKpis() {
    let company: IdbCompany = this.companyIdbService.selectedCompany.getValue();
    let companyKpis: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicatorIdbService.getByCompanyGuid(company.guid);
    let companyKpms: Array<KeyPerformanceMetric> = this.keyPerformanceIndicatorIdbService.getCompanyKeyPerformanceMetrics(company.guid);
    this.companyTrackedKpis = companyKpis.map(kpi => { return kpi.optionValue });
    this.companyTrackedKpms = companyKpms.map(kpm => { return kpm.value });
  }

  selectNeb(neb: NebOption) {
    neb.selected = !neb.selected;
    let selectedNebs: Array<NebOption> = this.nebOptions.filter(neb => {
      return neb.selected
    });
    this.emitSelectedNebs.emit(selectedNebs);
  }


}
