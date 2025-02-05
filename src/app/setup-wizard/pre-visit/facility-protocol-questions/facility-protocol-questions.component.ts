import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft, faChevronRight, faClipboardQuestion, faFilePdf, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { SetupWizardService } from '../../setup-wizard.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-facility-protocol-questions',
  standalone: false,

  templateUrl: './facility-protocol-questions.component.html',
  styleUrl: './facility-protocol-questions.component.css'
})
export class FacilityProtocolQuestionsComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faClipboardQuestion: IconDefinition = faClipboardQuestion;
  faFilePdf: IconDefinition = faFilePdf;

  facilitySub: Subscription;
  facility: IdbFacility;
  routeGuardWarningModal: boolean = false;

  printSub: Subscription;
  print: boolean;

  constructor(private facilityIdbService: FacilityIdbService, private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private setupWizardService: SetupWizardService,
    private sharedDataService: SharedDataService
  ) {

  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(facility => {
      this.facility = facility;
    });
    this.printSub = this.sharedDataService.print.subscribe(print => {
      this.print = print;
      if (this.print) {
        this.printReport();
      }
    });
  }

  ngOnDestroy() {
    this.facilitySub.unsubscribe();
    this.setupWizardService.focusedHelp.next(undefined);
    this.printSub.unsubscribe();
  }

  async goBack() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('/setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-setup');
  }

  async goToKpis() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    if (!this.facility.sidebarKPIsOpen) {
      this.facility.sidebarKPIsOpen = true;
      await this.facilityIdbService.asyncUpdate(this.facility);
    }
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-kpi-select');
  }

  togglePrint() {
    this.sharedDataService.print.next(true);
  }

  printReport() {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
      setTimeout(() => {
        window.print();
        this.sharedDataService.print.next(false)
      }, 1000)
    }, 100)
  }
}
