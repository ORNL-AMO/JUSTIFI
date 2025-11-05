import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faAddressBook, faChartColumn, faPieChart, faPrint, faSackDollar, faScrewdriverWrench, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { ReportIdbService } from 'src/app/indexed-db/report-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbContact } from 'src/app/models/contact';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { IdbReport } from 'src/app/models/report';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-custom-report',
  standalone: false,

  templateUrl: './custom-report.component.html',
  styleUrl: './custom-report.component.css'
})
export class CustomReportComponent {
  
  faPieChart: IconDefinition = faPieChart;
  faSackDollar: IconDefinition = faSackDollar;
  faChartColumn: IconDefinition = faChartColumn;
  faAddressBook: IconDefinition = faAddressBook;

  report: IdbReport;
  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  energyOpportunities: Array<IdbEnergyOpportunity>;
  kpis: Array<IdbKeyPerformanceIndicator>;
  assessments: Array<IdbAssessment>;
  contacts: Array<IdbContact>;
  processEquipments: Array<IdbProcessEquipment>;
  energyEquipments: Array<IdbEnergyEquipment>;
  onSiteVisit: IdbOnSiteVisit;

  inPortfolio: boolean;
  faPrint: IconDefinition = faPrint;
  printSub: Subscription;
  print: boolean = false;
  constructor(private reportIdbService: ReportIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private contactIdbService: ContactIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private router: Router,
    private sharedDataService: SharedDataService) {

  }

  ngOnInit() {
    this.inPortfolio = this.router.url.includes('portfolio');
    this.nonEnergyBenefits = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.getValue();
    this.energyOpportunities = this.energyOpportunityIdbService.energyOpportunities.getValue();
    this.kpis = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.getValue();
    this.assessments = this.assessmentIdbService.assessments.getValue();
    this.contacts = this.contactIdbService.contacts.getValue();
    this.processEquipments = this.processEquipmentIdbService.processEquipments.getValue();
    this.energyEquipments = this.energyEquipmentIdbService.energyEquipments.getValue();
    this.report = this.reportIdbService.selectedReport.getValue();
    this.onSiteVisit = this.onSiteVisitIdbService.getByGuid(this.report.onSiteVisitId);

    this.printSub = this.sharedDataService.print.subscribe(print => {
      this.print = print;
      if (this.print) {
        this.printReport();
      }
    });
  }

  ngOnDestroy() {
    this.printSub.unsubscribe();
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
