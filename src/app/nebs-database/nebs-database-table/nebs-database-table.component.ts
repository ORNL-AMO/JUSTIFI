import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { faCheck, faChevronDown, faChevronUp, faMagnifyingGlass, faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import * as _ from 'lodash';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceIndicatorOption, KeyPerformanceIndicatorOptions, KeyPerformanceIndicatorValue } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';
import { KeyPerformanceMetric, KeyPerformanceMetricOption, KeyPerformanceMetricOptions, KeyPerformanceMetricValue } from 'src/app/shared/constants/keyPerformanceMetrics';
import { NebKeywords, NebOption, NebOptions } from 'src/app/shared/constants/nonEnergyBenefitOptions';
import { LocalStorageDataService } from 'src/app/shared/shared-services/local-storage-data.service';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
    selector: 'app-nebs-database-table',
    templateUrl: './nebs-database-table.component.html',
    styleUrl: './nebs-database-table.component.css',
    standalone: false
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
  keywordList: Array<string> = [];
  filteredKeywordList: Array<string> = [];
  topKeywords: Array<string> = [];
  
  orderByDir: 'asc' | 'desc' = 'asc';
  nebSearchStr: string = '';
  kpiValue: KeyPerformanceIndicatorValue;
  kpmValue: KeyPerformanceMetricValue;
  kpmCompositeValue: string;
  allKpmOptions: Array<KeyPerformanceMetricOption> = KeyPerformanceMetricOptions;
  keyPerformanceIndicatorOptions: Array<KeyPerformanceIndicatorOption> = KeyPerformanceIndicatorOptions;
  keyPerformanceMetricOptions: Array<KeyPerformanceMetricOption> = [];

  facilityTrackedKpis: Array<KeyPerformanceIndicatorValue> = [];
  facilityTrackedKpms: Array<string> = [];

  constructor(private cd: ChangeDetectorRef, private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private companyIdbService: CompanyIdbService,
    private sharedDataService: SharedDataService,
    private assessmentIdbService: AssessmentIdbService,
    private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService,
    private facilityIdbService: FacilityIdbService,
    private localStorageDataService: LocalStorageDataService,
  ) { }

  ngOnInit() {
    if (this.inAddModal) {
      this.setFacilityKpis();
    }
    this.setNebOptions();
    this.keyPerformanceIndicatorOptions = _.orderBy(KeyPerformanceIndicatorOptions, (option: KeyPerformanceIndicatorOption) => {
      return option.label;
    }, 'asc');
    this.setKpmOptions();
    this.topKeywords = this.localStorageDataService.topKeywords;
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

    if (this.facilityTrackedKpis && this.facilityTrackedKpms) {
      this.keyPerformanceIndicatorOptions = _.orderBy(this.keyPerformanceIndicatorOptions, (option: KeyPerformanceIndicatorOption) => {
        return this.facilityTrackedKpis.includes(option.optionValue)
      }, 'desc');
      this.keyPerformanceMetricOptions = _.orderBy(this.keyPerformanceMetricOptions, (option: KeyPerformanceMetricOption) => {
        return this.facilityTrackedKpms.includes(option.value + option.kpiValue)
      }, 'desc');
    }
    let selectedIndex: number = this.keyPerformanceMetricOptions.findIndex(option => {
      return (option.value + option.kpiValue) == this.kpmCompositeValue;
    })
    if (selectedIndex == -1) {
      this.kpmCompositeValue = undefined;
    }
    this.cd.detectChanges();
  }

  filterKeywordList() {
    const searchStr = this.nebSearchStr.toLowerCase().trim();
    if (!searchStr) {
      this.filteredKeywordList = [];
      return;
    }
    const keywordWithIndex = this.keywordList
      .map(keyword => {
        const words = keyword.toLowerCase().split(/\s+/);
        const index = words.findIndex(word => word.startsWith(searchStr));
        return { keyword, index }; // return keyword and index
      })
      .filter(item => item.index !== -1); // filter out non-matching keywords
    
    keywordWithIndex.sort((a, b) => a.index - b.index); // sort by index
    const keywordMatched = _.uniq(keywordWithIndex.map(item => item.keyword));
    this.filteredKeywordList = keywordMatched.slice(0, 10); // limit to 10 matches
    if (keywordMatched.length > 10) {
      this.filteredKeywordList.push('...');
    }
    // TODO: update top keywords
  }

  selectKeyword(keyword: string) {
    this.nebSearchStr = keyword;
    this.filteredKeywordList = [];
  }

  selectTopKeyword(keyword: string) {
    this.nebSearchStr = keyword;
    this.filteredKeywordList = [];
  }

  setNebOptions() {
    let nebOptionsList: Array<NebOption> = new Array();
    if (!this.inAddModal) {
      nebOptionsList = NebOptions.map(option => {
        return option;
      });
    } else {
      let modalData: { assessmentId: string, energyOpportunityId: string } = this.sharedDataService.displayAddNebsModal.getValue();
      let assessment: IdbAssessment = this.assessmentIdbService.getByGuid(modalData.assessmentId);
      let selectedNebs: Array<IdbNonEnergyBenefit>;
      if (modalData.energyOpportunityId) {
        selectedNebs = this.nonEnergyBenefitIdbService.getEnergyOpportunityNonEnergyBenefits(modalData.energyOpportunityId);
      } else {
        selectedNebs = this.nonEnergyBenefitIdbService.getAssessmentNonEnergyBenefits(assessment.guid, true);
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
    this.keywordList = nebOptionsList
      .map(option => NebKeywords[option.optionValue] || [])
      .flat();
    this.nebOptions = nebOptionsList;
  }

  toggleOrderBy() {
    if (this.orderByDir == 'asc') {
      this.orderByDir = 'desc';
    } else {
      this.orderByDir = 'asc';
    }
  }

  setFacilityKpis() {
    let facility: IdbFacility = this.facilityIdbService.selectedFacility.getValue();
    let facilityKpis: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicatorIdbService.getByFacilityGuid(facility.guid);
    let facilityKpms: Array<KeyPerformanceMetric> = this.keyPerformanceIndicatorIdbService.getFacilityKeyPerformanceMetrics(facility.guid);
    this.facilityTrackedKpis = facilityKpis.map(kpi => { return kpi.optionValue });
    this.facilityTrackedKpms = facilityKpms.map(kpm => { return kpm.value + kpm.kpiValue });
  }

  selectNeb(neb: NebOption) {
    neb.selected = !neb.selected;
    let selectedNebs: Array<NebOption> = this.nebOptions.filter(neb => {
      return neb.selected
    });
    this.emitSelectedNebs.emit(selectedNebs);
  }

  setChecked(neb: NebOption, kpmValue: KeyPerformanceMetricValue, kpiValue: KeyPerformanceIndicatorValue) {
    const compositeKey = kpmValue + kpiValue;
    if (neb.selectedKPM.includes(compositeKey)) {
      neb.selectedKPM = neb.selectedKPM.filter(kpm => {
        return kpm != compositeKey;
      })
    } else {
      neb.selectedKPM.push(compositeKey);
    }
  }

  setKpmValue() {
    if (!this.kpmCompositeValue) {
      this.kpmValue = undefined;
      return;
    }
    const selectedKpmOption = KeyPerformanceMetricOptions.find(option => {
      return (option.value + option.kpiValue) == this.kpmCompositeValue;
    });
    this.kpmValue = selectedKpmOption?.value;
  }

}
