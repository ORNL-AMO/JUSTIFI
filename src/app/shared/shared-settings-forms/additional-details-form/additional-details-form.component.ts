import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GeneralInformation } from 'src/app/models/generalInformation';
import { FirstNaicsList, NAICS, SecondNaicsList, ThirdNaicsList } from '../form-data-options/naics-data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { Subscription } from 'rxjs';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IconDefinition, faFilePen } from '@fortawesome/free-solid-svg-icons';
import { SharedSettingsFormsService } from '../shared-settings-forms.service';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';

@Component({
  selector: 'app-additional-details-form',
  templateUrl: './additional-details-form.component.html',
  styleUrls: ['./additional-details-form.component.css'],
  standalone: false
})
export class AdditionalDetailsFormComponent implements OnInit, OnDestroy {
  @Input()
  inCompany: boolean;

  faFilePen: IconDefinition = faFilePen;

  form: FormGroup;

  facility: IdbFacility;
  company: IdbCompany;
  companyOrFacilitySub: Subscription;
  firstNaicsList: Array<NAICS> = FirstNaicsList;
  secondNaicsList: Array<NAICS> = SecondNaicsList;
  thirdNaicsList: Array<NAICS> = ThirdNaicsList;
  constructor(private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService, private sharedSettingsFormsService: SharedSettingsFormsService,
    private setupWizardService: SetupWizardService) {
  }

  ngOnInit() {
    if (this.inCompany) {
      this.companyOrFacilitySub = this.companyIdbService.selectedCompany.subscribe(_company => {
        if (!this.company || (this.company.guid != _company.guid)) {
          //initialize form on company change
          this.form = this.sharedSettingsFormsService.getGeneralInformationForm(_company.generalInformation, 'additional-details');
        }
        this.company = _company;
      });
    } else {
      this.companyOrFacilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
        if (!this.facility || (this.facility.guid != _facility.guid)) {
          //initialize form on facility change
          this.form = this.sharedSettingsFormsService.getGeneralInformationForm(_facility.generalInformation, 'additional-details');
        }
        this.facility = _facility;
      });
    }
  }

  ngOnDestroy() {
    if (this.companyOrFacilitySub) {
      this.companyOrFacilitySub.unsubscribe();
    }
  }

  async saveChanges() {
    if (this.inCompany) {
      this.company.generalInformation = this.sharedSettingsFormsService
        .updateGeneralInformationFromForm(this.form, this.company.generalInformation, 'additional-details');
      await this.companyIdbService.asyncUpdate(this.company);
    } else {
      this.facility.generalInformation = this.sharedSettingsFormsService
        .updateGeneralInformationFromForm(this.form, this.facility.generalInformation, 'additional-details');
      await this.facilityIdbService.asyncUpdate(this.facility);
    }
  }

  checkNAICS() {
    //make sure sublist selections are a part of selected parent
    if (this.form.controls['naics1'].value && this.form.controls['naics2'].value) {
      let naicsItem: NAICS = this.secondNaicsList.find(item => { return item.code == this.form.controls['naics2'].value });
      if (naicsItem && naicsItem.matchNum != this.form.controls['naics1'].value) {
        this.form.controls['naics2'].patchValue(null);
        this.form.controls['naics2'].updateValueAndValidity();
      }
    }

    if (this.form.controls['naics2'].value && this.form.controls['naics3'].value) {
      let naicsItem: NAICS = this.thirdNaicsList.find(item => { return item.code == this.form.controls['naics3'].value });
      if (naicsItem && naicsItem.matchNum != this.form.controls['naics2'].value) {
        this.form.controls['naics3'].patchValue(null);
        this.form.controls['naics3'].updateValueAndValidity();
      }
    }
    this.saveChanges();
  }

  focusField() {
    this.setupWizardService.focusedHelp.next('additionalDetails');
  }
}
