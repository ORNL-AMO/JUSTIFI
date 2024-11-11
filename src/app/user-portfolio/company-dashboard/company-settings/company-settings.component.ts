import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrl: './company-settings.component.css'
})
export class CompanySettingsComponent {


  selectedCompany: IdbCompany;
  selectedCompanySub: Subscription;
  name: FormControl;
  routeGuardWarningModal: boolean = false;

  hasAssessments: boolean = false;
  constructor(
    private companyIdbService: CompanyIdbService
  ) {

  }

  ngOnInit() {
    this.selectedCompanySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.selectedCompany = _company;
      if (this.selectedCompany) {
        this.name = new FormControl(this.selectedCompany.generalInformation.name, [Validators.required]);
      }
    });
  }

  canDeactivate(): Observable<boolean> {
    if (this.name && this.name.getError('required')) {
      this.name.markAsTouched();
      this.displayWarningModal();
      return of(false);
    }
    return of(true);
  }

  ngOnDestroy() {
    this.selectedCompanySub.unsubscribe();
  }


  displayWarningModal() {
    this.routeGuardWarningModal = true;
  }
  closeWarningModal() {
    this.routeGuardWarningModal = false;
  }
}
