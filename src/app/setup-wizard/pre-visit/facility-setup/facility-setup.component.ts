import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdbFacility } from 'src/app/models/facility';
import { IconDefinition, faChevronLeft, faChevronRight, faIndustry, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-facility-setup',
  templateUrl: './facility-setup.component.html',
  styleUrl: './facility-setup.component.css'
})
export class FacilitySetupComponent implements OnInit {

  name: FormControl;
  facilityName: string;

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faIndustry: IconDefinition = faIndustry;
  faCircleExclamation: IconDefinition = faCircleExclamation;

  facilitySub: Subscription;
  facility: IdbFacility;
  routeGuardWarningModal: boolean = false;

  constructor(private facilityIdbService: FacilityIdbService, private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService
  ) {

  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(facility => {
      this.facility = facility;
      if(this.facility){
        this.name = new FormControl(this.facility.generalInformation.name, [Validators.required]);
      }else{
        this.name = new FormControl('', [Validators.required]);
      }
    });
  }

  ngOnDestroy(){
    this.facilitySub.unsubscribe();
  }

  async saveChanges() {
    let facility: IdbFacility = this.facilityIdbService.selectedFacility.getValue();
    facility.generalInformation.name = this.name.value;
    await this.facilityIdbService.asyncUpdate(facility);
  }

  goBack() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('/setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-kpi-select');
  }

  goToEnergyEquipment() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/energy-equipment');
  }

  canDeactivate(): Observable<boolean> {
    if (this.name && this.name.getError('required')) {
      this.name.markAsTouched();
      this.displayWarningModal();
      return of(false);
    }
    return of(true);
  }

  displayWarningModal() {
    this.routeGuardWarningModal = true;
  }
  closeWarningModal() {
    this.routeGuardWarningModal = false;
  }
}
