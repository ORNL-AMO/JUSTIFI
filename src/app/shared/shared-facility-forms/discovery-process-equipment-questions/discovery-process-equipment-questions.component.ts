import { Component, Input } from '@angular/core';
import { faClipboardQuestion, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { BootstrapService } from '../../shared-services/bootstrap.service';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';

@Component({
  selector: 'app-discovery-process-equipment-questions',
  standalone: false,

  templateUrl: './discovery-process-equipment-questions.component.html',
  styleUrl: './discovery-process-equipment-questions.component.css'
})
export class DiscoveryProcessEquipmentQuestionsComponent {
  @Input()
  inPortfolio: boolean;

  faClipboardQuestion: IconDefinition = faClipboardQuestion;

  collapseTackStock: boolean = true;
  collapseOperations: boolean = true;
  collapseSustainability: boolean = true;
  collapseEmployeeEngagement: boolean = true;

  displayNavModal: boolean = false;
  processEquipment: IdbProcessEquipment;
  constructor(
    private bootstrapService: BootstrapService,
    private setupWizardService: SetupWizardService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private processEquipmentIdbService: ProcessEquipmentIdbService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.processEquipment = this.processEquipmentIdbService.getByGuid(params['id']);
    });
  }

  ngOnDestroy() {
    this.setupWizardService.focusedHelp.next(undefined);
  }


  focusField(str: string) {
    this.setupWizardService.focusedHelp.next(str);
  }

  toggleBS(collapseId: 'takeStock' | 'operations' | 'sustainability' | 'employeeEngagement') {
    this.bootstrapService.bsCollapse('#' + collapseId);
    if (collapseId == 'takeStock') {
      this.collapseTackStock = !this.collapseTackStock;
      if (!this.collapseTackStock) {
        this.collapseOperations = true;
        this.collapseEmployeeEngagement = true;
        this.collapseSustainability = true;
      }
    } else if (collapseId == 'operations') {
      this.collapseOperations = !this.collapseOperations;
      if (!this.collapseOperations) {
        this.collapseTackStock = true;
        this.collapseEmployeeEngagement = true;
        this.collapseSustainability = true;
      }
    } else if (collapseId == 'sustainability') {
      this.collapseSustainability = !this.collapseSustainability;
      if (!this.collapseSustainability) {
        this.collapseTackStock = true;
        this.collapseEmployeeEngagement = true;
        this.collapseOperations = true;
      }
    } else if (collapseId == 'employeeEngagement') {
      this.collapseEmployeeEngagement = !this.collapseEmployeeEngagement;
      if (!this.collapseEmployeeEngagement) {
        this.collapseTackStock = true;
        this.collapseSustainability = true;
        this.collapseOperations = true;
      }
    }
    this.focusField(collapseId)
  }

  showProtocolModal() {
    this.displayNavModal = true;
  }

  closeNavModal() {
    this.displayNavModal = false;
  }

  goToPortfolio() {
    this.router.navigateByUrl('/portfolio/facility/' + this.processEquipment.facilityId + '/end-use-inventory/' + this.processEquipment.guid);
  }
}
