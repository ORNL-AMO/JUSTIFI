import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { faAsterisk, faCheck, faChevronDown, faChevronUp, faMagnifyingGlass, faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import * as _ from 'lodash';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
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

  faChevronUp: IconDefinition = faChevronUp;
  faChevronDown: IconDefinition = faChevronDown;
  faPlus: IconDefinition = faPlus;
  faCheck: IconDefinition = faCheck;
  faAsterisk: IconDefinition = faAsterisk;
  faMagnifyingGlass: IconDefinition = faMagnifyingGlass;

  nebOptions: Array<NebOption> = NebOptions;

  orderByDir: 'asc' | 'desc' = 'asc';
  nebSearchStr: string = '';
  kpiValue: KeyPerformanceIndicatorValue;
  kpmValue: KeyPerformanceMetricValue;
  keyPerformanceIndicatorOptions: Array<KeyPerformanceIndicatorOption> = KeyPerformanceIndicatorOptions;
  keyPerformanceMetricOptions: Array<KeyPerformanceMetricOption> = [];

  companyTrackedKpis: Array<KeyPerformanceIndicatorValue> = [];
  companyTrackedKpms: Array<KeyPerformanceMetricValue> = [];
  constructor(private cd: ChangeDetectorRef, private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private companyIdbService: CompanyIdbService
  ) { }

  ngOnInit() {
    if (this.inAddModal) {
      this.setCompanyKpis();
    }
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
    console.log(this.companyTrackedKpis);
    this.companyTrackedKpms = companyKpms.map(kpm => { return kpm.value });
  }

}
