import { Component } from '@angular/core';
import { faBullseye, faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';

@Component({
    selector: 'app-facility-performance-indicators',
    templateUrl: './facility-performance-indicators.component.html',
    styleUrl: './facility-performance-indicators.component.css',
    standalone: false
})
export class FacilityPerformanceIndicatorsComponent {

  faBullseye: IconDefinition = faBullseye;
  faChevronRight: IconDefinition = faChevronRight;

  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
  keyPerformanceIndicatorsSub: Subscription;

  facility: IdbFacility;
  facilitySub: Subscription;
  constructor(private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private facilityIdbService: FacilityIdbService
  ) {
  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(facility => {
      this.facility = facility;
    })

    this.keyPerformanceIndicatorsSub = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.subscribe(kpis => {
      this.keyPerformanceIndicators = kpis.filter(kpi => {
        return kpi.facilityId == this.facility.guid
      });
    });
  }

  ngOnDestroy() {
    this.facilitySub.unsubscribe();
    this.keyPerformanceIndicatorsSub.unsubscribe();
  }
}
