import { Component } from '@angular/core';
import { faIndustry, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';

@Component({
  selector: 'app-facility-dashboard-home',
  templateUrl: './facility-dashboard-home.component.html',
  styleUrl: './facility-dashboard-home.component.css'
})
export class FacilityDashboardHomeComponent {

  faIndustry: IconDefinition = faIndustry;

  facility: IdbFacility;
  facilitySub: Subscription;
  constructor(private facilityIdbService: FacilityIdbService) {  }

  ngOnInit(){
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(facility => {
      this.facility = facility;
    })
  }

  ngOnDestroy(){
    this.facilitySub.unsubscribe();
  }
}
