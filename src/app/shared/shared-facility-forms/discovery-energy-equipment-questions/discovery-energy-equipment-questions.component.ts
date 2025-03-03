import { Component, Input } from '@angular/core';
import { BootstrapService } from '../../shared-services/bootstrap.service';
import { faClipboardQuestion, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';

@Component({
  selector: 'app-discovery-energy-equipment-questions',
  standalone: false,

  templateUrl: './discovery-energy-equipment-questions.component.html',
  styleUrl: './discovery-energy-equipment-questions.component.css'
})
export class DiscoveryEnergyEquipmentQuestionsComponent {
  @Input()
  inPortfolio: boolean;

  faClipboardQuestion: IconDefinition = faClipboardQuestion;
  
  collapseTackStock: boolean = true;
  collapseOperations: boolean = true;
  collapseSustainability: boolean = true;
  collapseEmployeeEngagement: boolean = true;

  constructor(
    private bootstrapService: BootstrapService,
    private setupWizardService: SetupWizardService
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.setupWizardService.focusedHelp.next(undefined);
  }

  
  focusField(str: string) {
    this.setupWizardService.focusedHelp.next(str);
  }

  toggleBS(collapseId: 'takeStock' | 'operations' | 'sustainability' | 'employeeEngagement') {
    this.bootstrapService.bsCollapse('#' + collapseId);
    if (collapseId == 'takeStock') {
      this.collapseTackStock = !this.collapseTackStock;
      if(!this.collapseTackStock){
        this.collapseOperations = true;
        this.collapseEmployeeEngagement = true;
        this.collapseSustainability = true;
      }
    } else if (collapseId == 'operations') {
      this.collapseOperations = !this.collapseOperations;
      if(!this.collapseOperations){
        this.collapseTackStock = true;
        this.collapseEmployeeEngagement = true;
        this.collapseSustainability = true;
      }
    } else if(collapseId == 'sustainability'){
      this.collapseSustainability = !this.collapseSustainability;
      if(!this.collapseSustainability){
        this.collapseTackStock = true;
        this.collapseEmployeeEngagement = true;
        this.collapseOperations = true;
      }
    } else if(collapseId == 'employeeEngagement'){
      this.collapseEmployeeEngagement = !this.collapseEmployeeEngagement;
      if(!this.collapseEmployeeEngagement){
        this.collapseTackStock = true;
        this.collapseSustainability = true;
        this.collapseOperations = true;
      }
    }
    this.focusField(collapseId)
  }
}
