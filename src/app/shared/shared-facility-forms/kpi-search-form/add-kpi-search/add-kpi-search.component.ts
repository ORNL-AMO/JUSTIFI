import { Component } from '@angular/core';
import { IconDefinition, faCircleQuestion, faMagnifyingGlass, faMagnifyingGlassPlus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription, firstValueFrom } from 'rxjs';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { IdbKeyPerformanceIndicator, getNewKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { KeyPerformanceIndicatorOption, KeyPerformanceIndicatorOptions, PrimaryKPI, PrimaryKPIs } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';

@Component({
    selector: 'app-add-kpi-search',
    templateUrl: './add-kpi-search.component.html',
    styleUrl: './add-kpi-search.component.css',
    standalone: false
})
export class AddKpiSearchComponent {

  faMagnifyingGlassPlus: IconDefinition = faMagnifyingGlassPlus;
  faMagnifyingGlass: IconDefinition = faMagnifyingGlass;
  faPlus: IconDefinition = faPlus;
  faCircleQuestion: IconDefinition = faCircleQuestion;

  facility: IdbFacility;
  facilitySub: Subscription;

  primaryKPIs: Array<PrimaryKPI> = PrimaryKPIs;

  kpiCategorySearch: PrimaryKPI | undefined = undefined;
  kpiSearchStr: string = '';

  keyPerformanceIndicatorOptions: Array<KeyPerformanceIndicatorOption> = KeyPerformanceIndicatorOptions;
  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
  keyPerformanceIndicatorSub: Subscription;
  constructor(private facilityIdbService: FacilityIdbService, private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService
  ) {
  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      this.facility = _facility;;
    });
    this.keyPerformanceIndicatorSub = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.subscribe(_keyPerformanceIndicators => {
      this.keyPerformanceIndicators = _keyPerformanceIndicators;
    });
  }

  ngOnDestroy() {
    this.facilitySub.unsubscribe();
    this.keyPerformanceIndicatorSub.unsubscribe();
  }

  async addKPI(option: KeyPerformanceIndicatorOption) {
    let newKPI: IdbKeyPerformanceIndicator = getNewKeyPerformanceIndicator(this.facility.userId, this.facility.companyId, option, false, this.facility.guid);
    await firstValueFrom(this.keyPerformanceIndicatorIdbService.addWithObservable(newKPI));
    await this.keyPerformanceIndicatorIdbService.setKeyPerformanceIndicators();
  }
}
