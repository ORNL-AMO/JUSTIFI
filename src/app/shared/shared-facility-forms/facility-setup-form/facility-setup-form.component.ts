import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';

@Component({
    selector: 'app-facility-setup-form',
    templateUrl: './facility-setup-form.component.html',
    styleUrl: './facility-setup-form.component.css',
    standalone: false
})
export class FacilitySetupFormComponent {

  name: FormControl;
  facilityName: string;
  facility: IdbFacility;
  constructor(private facilityIdbService: FacilityIdbService, private router: Router
  ) {
  }

  ngOnInit() {
    this.facility = this.facilityIdbService.selectedFacility.getValue();
    if (this.facility) {
      this.name = new FormControl(this.facility.generalInformation.name, [Validators.required]);
    } else {
      this.name = new FormControl('', [Validators.required]);
    }
  }

  async saveChanges() {
    let facility: IdbFacility = this.facilityIdbService.selectedFacility.getValue();
    facility.generalInformation.name = this.name.value;
    await this.facilityIdbService.asyncUpdate(facility);
  }
}
