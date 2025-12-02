import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faAddressBook, faChevronLeft, faChevronRight, faFilePdf, faFilePowerpoint, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbContact } from 'src/app/models/contact';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-stakeholder-evaluation',
  standalone: false,

  templateUrl: './stakeholder-evaluation.component.html',
  styleUrl: './stakeholder-evaluation.component.css'
})
export class StakeholderEvaluationComponent {

  faChevronLeft: IconDefinition = faChevronLeft;
  faChevronRight: IconDefinition = faChevronRight;
  faFilePdf: IconDefinition = faFilePdf;
  faFilePowerpoint: IconDefinition = faFilePowerpoint;
  faAddressBook: IconDefinition = faAddressBook;

  onSiteVisit: IdbOnSiteVisit;
  selectedContactGuids: Set<string> = new Set();
  allContacts: Array<IdbContact> = [];
  assessments: Array<IdbAssessment> = [];
  energyEquipments: Array<IdbEnergyEquipment> = [];
  processEquipments: Array<IdbProcessEquipment> = [];
  kpis: Array<IdbKeyPerformanceIndicator> = [];
  nebs: Array<IdbNonEnergyBenefit> = [];
  report: any; // Optional report for filtering - can be enhanced later
  print: boolean;
  printSub: Subscription;
  
  constructor(private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private contactIdbService: ContactIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private sharedDataService: SharedDataService
  ) {

  }

  ngOnInit() {
    this.onSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.allContacts = this.contactIdbService.contacts.getValue();
    this.assessments = this.assessmentIdbService.assessments.getValue();
    this.energyEquipments = this.energyEquipmentIdbService.energyEquipments.getValue();
    this.processEquipments = this.processEquipmentIdbService.processEquipments.getValue();
    this.kpis = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.getValue();
    this.nebs = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.getValue();
    this.printSub = this.sharedDataService.print.subscribe(print => {
      this.print = print;
      if (this.print) {
        this.printReport();
      }
    });
  }

  selectAllSelections(facilityContacts: Array<IdbContact>) {
    facilityContacts.forEach(contact => this.selectedContactGuids.add(contact.guid));
  }

  clearAllSelections() {
    this.selectedContactGuids.clear();
  }

  toggleContactGuid(contactGuid: string) {
    if (this.selectedContactGuids.has(contactGuid)) {
      this.selectedContactGuids.delete(contactGuid);
    } else {
      this.selectedContactGuids.add(contactGuid);
    }
  }

  ngOnDestroy() {
    this.printSub.unsubscribe();
  }

  goNext() {
    this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid + '/custom-report');
  }

  goBack() {
    this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid + '/visit-report');
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

  generatePowerPoint() {
    this.sharedDataService.createPowerPoint.next(true);
    this.sharedDataService.createPowerPoint.next(false);
  }
}