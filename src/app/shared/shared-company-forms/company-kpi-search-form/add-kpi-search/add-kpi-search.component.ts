import { Component } from '@angular/core';
import { IconDefinition, faCircleQuestion, faMagnifyingGlass, faMagnifyingGlassPlus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription, firstValueFrom } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbKeyPerformanceIndicator, getNewKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { KeyPerformanceIndicatorOption, KeyPerformanceIndicatorOptions, PrimaryKPI, PrimaryKPIs } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';

@Component({
  selector: 'app-add-kpi-search',
  templateUrl: './add-kpi-search.component.html',
  styleUrl: './add-kpi-search.component.css'
})
export class AddKpiSearchComponent {

  faMagnifyingGlassPlus: IconDefinition = faMagnifyingGlassPlus;
  faMagnifyingGlass: IconDefinition = faMagnifyingGlass;
  faPlus: IconDefinition = faPlus;
  faCircleQuestion: IconDefinition = faCircleQuestion;

  company: IdbCompany;
  companySub: Subscription;

  primaryKPIs: Array<PrimaryKPI> = PrimaryKPIs;

  kpiCategorySearch: PrimaryKPI | undefined = undefined;
  kpiSearchStr: string = '';

  keyPerformanceIndicatorOptions: Array<KeyPerformanceIndicatorOption> = KeyPerformanceIndicatorOptions;
  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
  keyPerformanceIndicatorSub: Subscription;
  constructor(private companyIdbService: CompanyIdbService, private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService
  ) {
  }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.company = _company;
    });
    this.keyPerformanceIndicatorSub = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.subscribe(_keyPerformanceIndicators => {
      this.keyPerformanceIndicators = _keyPerformanceIndicators;
    });
  }

  ngOnDestroy() {
    this.companySub.unsubscribe();
    this.keyPerformanceIndicatorSub.unsubscribe();
  }

  async addKPI(option: KeyPerformanceIndicatorOption) {
    let newKPI: IdbKeyPerformanceIndicator = getNewKeyPerformanceIndicator(this.company.userId, this.company.guid, option, false);
    await firstValueFrom(this.keyPerformanceIndicatorIdbService.addWithObservable(newKPI));
    await this.keyPerformanceIndicatorIdbService.setKeyPerformanceIndicators();
  }
}
