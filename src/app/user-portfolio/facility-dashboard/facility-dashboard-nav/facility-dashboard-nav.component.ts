import { Component } from '@angular/core';
import { faBullseye, faDiagramProject, faFile, faGears, faList, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';

@Component({
  selector: 'app-facility-dashboard-nav',
  templateUrl: './facility-dashboard-nav.component.html',
  styleUrl: './facility-dashboard-nav.component.css'
})
export class FacilityDashboardNavComponent {

  faGears: IconDefinition = faGears;
  faFile: IconDefinition = faFile;
  faList: IconDefinition = faList;
  faDiagramProject: IconDefinition = faDiagramProject;
  faBullseye: IconDefinition = faBullseye;

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
