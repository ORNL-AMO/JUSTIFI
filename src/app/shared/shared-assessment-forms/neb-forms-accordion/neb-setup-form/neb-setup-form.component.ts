import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronDown, faChevronRight, faContactBook, faPlus, faScaleUnbalancedFlip, faSearchPlus, faTrash, faUser, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { KeyPerformanceMetric } from 'src/app/shared/constants/keyPerformanceMetrics';
import * as _ from 'lodash';
@Component({
  selector: 'app-neb-setup-form',
  templateUrl: './neb-setup-form.component.html',
  styleUrl: './neb-setup-form.component.css'
})
export class NebSetupFormComponent {
  @Input({ required: true })
  nebGuid: string;
  @Output('emitInitialized')
  emitInitialized = new EventEmitter<boolean>();

  nonEnergyBenefit: IdbNonEnergyBenefit;


  faSearchPlus: IconDefinition = faSearchPlus;
  faTrash: IconDefinition = faTrash;
  faWeightHanging: IconDefinition = faWeightHanging;
  faScaleUnbalancedFlip: IconDefinition = faScaleUnbalancedFlip;
  faUser: IconDefinition = faUser;
  faContactBook: IconDefinition = faContactBook;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronDown: IconDefinition = faChevronDown;
  faPlus: IconDefinition = faPlus;

  displayDeleteModal: boolean = false;
  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;

  kpi: IdbKeyPerformanceIndicator;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;

  hideUntrackedMetrics: boolean = true;
  performanceMetricToAdd: KeyPerformanceMetric;
  displayAddPerformanceMetricModal: boolean = false;

  performanceMetricImpactGuids: Array<string> = [];
  keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>
  kpmImpactsSub: Subscription;
  constructor(
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private dbChangesService: DbChangesService,
    private contactIdbService: ContactIdbService,
    private setupWizardService: SetupWizardService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService) {
  }

  ngOnInit() {
    this.nonEnergyBenefit = this.nonEnergyBenefitsIdbService.getByGuid(this.nebGuid);

    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.contacts = _contacts;
    });

    this.kpmImpactsSub = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.subscribe(_keyPerformanceMetricImpacts => {
      this.keyPerformanceMetricImpacts = _keyPerformanceMetricImpacts;
      this.setMetricGuids();
    });
  }

  ngOnDestroy() {
    this.contactsSub.unsubscribe();
    this.kpmImpactsSub.unsubscribe();
  }

  ngAfterViewInit() {
    //emit after intialized. 
    //When adding new nebs this will trigger the form to open
    this.emitInitialized.emit(true);
  }

  async saveChanges() {
    await this.nonEnergyBenefitsIdbService.asyncUpdate(this.nonEnergyBenefit);
  }

  async deleteNonEnergyBenefit() {
    await this.dbChangesService.deleteNonEnergyBenefit(this.nonEnergyBenefit);
  }

  showDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  toggleNote() {
    this.nonEnergyBenefit.includeNote = !this.nonEnergyBenefit.includeNote;
    this.saveChanges();
  }

  setMetricGuids() {
    // only want to update neb list if changes made
    // otherwise forms get re-init when the list updates
    if (this.nonEnergyBenefit && this.keyPerformanceMetricImpacts) {
      let nebImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpacts.filter(neb => {
        return neb.nebId == this.nonEnergyBenefit.guid
      });
      let tmpNebMetrics: Array<string> = nebImpacts.map(neb => {
        return neb.guid
      });
      if (tmpNebMetrics.length != this.performanceMetricImpactGuids.length) {
        this.performanceMetricImpactGuids = tmpNebMetrics;
      } else {
        let xor: Array<string> = _.xor(this.performanceMetricImpactGuids, tmpNebMetrics)
        if (xor.length != 0) {
          this.performanceMetricImpactGuids = tmpNebMetrics;
        }
      }
    } else {
      this.performanceMetricImpactGuids = [];
    }


  }

  openContactModal(viewContact: IdbContact) {
    this.setupWizardService.displayContactModal.next({ context: 'nonEnergyBenefit', viewContact: viewContact, contextGuid: this.nonEnergyBenefit.guid });
  }

  toggleUntrackedNebs() {
    this.hideUntrackedMetrics = !this.hideUntrackedMetrics;
  }

  selectMetricToAdd(metric: KeyPerformanceMetric) {
    this.performanceMetricToAdd = metric;
  }

  closeAddMetricModal() {
    this.displayAddPerformanceMetricModal = false;
    this.performanceMetricToAdd = undefined;

  }

  showUntrackedMetricsModal() {
    this.displayAddPerformanceMetricModal = true;
  }
}
