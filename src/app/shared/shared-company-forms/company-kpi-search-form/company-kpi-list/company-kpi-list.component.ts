import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faBullseye, faCircleQuestion, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription, firstValueFrom } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbKeyPerformanceIndicator, getNewKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { KeyPerformanceIndicatorOption, PrimaryKPI, PrimaryKPIs } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';

@Component({
  selector: 'app-company-kpi-list',
  templateUrl: './company-kpi-list.component.html',
  styleUrl: './company-kpi-list.component.css'
})
export class CompanyKpiListComponent {

  faTrash: IconDefinition = faTrash;
  faBullseye: IconDefinition = faBullseye;
  faUser: IconDefinition = faUser;
  faPlus: IconDefinition = faPlus;
  faCircleQuestion: IconDefinition = faCircleQuestion;

  company: IdbCompany;
  companySub: Subscription;


  kpiToDelete: IdbKeyPerformanceIndicator;
  displayDeleteModal: boolean = false;

  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
  keyPerformanceIndicatorSub: Subscription;

  displayCustomKPIModal: boolean = false;
  customKPIName: string = '';
  primaryKPIs: Array<PrimaryKPI> = PrimaryKPIs;
  kpiCategory: PrimaryKPI = 'Other';

  keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>
  keyPerformanceMetricImpactsSub: Subscription;
  constructor(
    private companyIdbService: CompanyIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private dbChangesService: DbChangesService,
    private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService
  ) {
  }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.company = _company;
    });
    this.keyPerformanceIndicatorSub = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.subscribe(_keyPerformanceIndicators => {
      this.keyPerformanceIndicators = _keyPerformanceIndicators;
    });
    this.keyPerformanceMetricImpactsSub = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.subscribe(_kpmImpacts => {
      this.keyPerformanceMetricImpacts = _kpmImpacts;
    })
  }

  ngOnDestroy() {
    this.companySub.unsubscribe();
    this.keyPerformanceIndicatorSub.unsubscribe();
    this.keyPerformanceMetricImpactsSub.unsubscribe();
  }

  openDeleteModal(kpi: IdbKeyPerformanceIndicator) {
    this.kpiToDelete = kpi;
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
    this.kpiToDelete = undefined;
  }

  async removeKPI() {
    await this.dbChangesService.deleteKPIs([this.kpiToDelete]);
    this.closeDeleteModal();
  }

  openAddCustomModal() {
    this.displayCustomKPIModal = true;
  }

  closeCustomKPIModal() {
    this.displayCustomKPIModal = false;
  }

  async confirmCreate() {
    let option: KeyPerformanceIndicatorOption = {
      primaryKPI: this.kpiCategory,
      label: this.customKPIName,
      htmlLabel: this.customKPIName,
      optionValue: 'other',
    }
    let newKPI: IdbKeyPerformanceIndicator = getNewKeyPerformanceIndicator(this.company.userId, this.company.guid, option, true);
    await firstValueFrom(this.keyPerformanceIndicatorIdbService.addWithObservable(newKPI));
    await this.keyPerformanceIndicatorIdbService.setKeyPerformanceIndicators();
    this.closeCustomKPIModal();
  }

  goToKpiDetails(kpi: IdbKeyPerformanceIndicator) {
    if (this.router.url.includes('portfolio')) {
      this.router.navigateByUrl('portfolio/company/' + kpi.companyId + '/performance-indicators/details/' + kpi.guid);
    } else {
      let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
      this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-kpi-detail/' + kpi.guid);
    }
  }

}
