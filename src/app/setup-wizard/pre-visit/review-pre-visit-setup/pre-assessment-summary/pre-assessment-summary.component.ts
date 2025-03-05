import { Component } from '@angular/core';
import { IconDefinition, faScrewdriverWrench, faToolbox, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';

@Component({
    selector: 'app-pre-assessment-summary',
    templateUrl: './pre-assessment-summary.component.html',
    styleUrl: './pre-assessment-summary.component.css',
    standalone: false
})
export class PreAssessmentSummaryComponent {


  assessments: Array<IdbAssessment>;
  faToolbox: IconDefinition = faToolbox;
  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  contacts: Array<IdbContact>;
  faUser: IconDefinition = faUser;
  onSiteVisit: IdbOnSiteVisit;
  companyEnergyUnit: string;

  currencyCode: string;
  currencySub: Subscription;
  
  constructor(private companyIdbService: CompanyIdbService, private contactIdbService: ContactIdbService,
    private assessmentIdbService: AssessmentIdbService, private onSiteVisitIdbService: OnSiteVisitIdbService,
    private localeService: LocaleService,
  ) {
  }

  ngOnInit() {
    let company: IdbCompany = this.companyIdbService.selectedCompany.getValue();
    this.companyEnergyUnit = company.companyEnergyUnit;
    this.onSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.assessments = this.assessmentIdbService.assessments.getValue();
    this.contacts = this.contactIdbService.contacts.getValue();
    this.currencySub = this.localeService.currencyCode.subscribe(code => {
      this.currencyCode = code;
    });
  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
  }
}
