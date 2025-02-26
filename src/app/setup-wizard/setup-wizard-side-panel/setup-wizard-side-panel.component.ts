import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faChartPie, faChevronCircleLeft, faChevronCircleRight, faChevronLeft, faChevronRight, faCircleQuestion, faDiagramProject, faWeightHanging, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { SetupWizardService } from '../setup-wizard.service';

@Component({
  selector: 'app-setup-wizard-side-panel',
  standalone: false,

  templateUrl: './setup-wizard-side-panel.component.html',
  styleUrl: './setup-wizard-side-panel.component.css'
})
export class SetupWizardSidePanelComponent {
  @Output('emitToggleCollapse')
  emitToggleCollapse: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  faCircleQuestion: IconDefinition = faCircleQuestion;
  faChartPie: IconDefinition = faChartPie;
  faDiagramProject: IconDefinition = faDiagramProject
  faChevronCircleRight: IconDefinition = faChevronCircleRight;
  faChevronCircleLeft: IconDefinition = faChevronCircleLeft;
  faWeightHanging: IconDefinition = faWeightHanging;

  helpPanelOpenSub: Subscription;
  helpPanelOpen: boolean;

  activePanel: 'help' | 'system-diagram' | 'results' | 'nebs' = 'help';
  constructor(
    private setupWizardService: SetupWizardService
  ) {

  }

  ngOnInit() {
    this.helpPanelOpenSub = this.setupWizardService.helpPanelOpen.subscribe(val => {
      this.helpPanelOpen = val;
      //needed to resize charts
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 100)
    });
  }

  ngOnDestroy() {
    this.helpPanelOpenSub.unsubscribe();
  }

  toggleCollapseHelpPanel() {
    this.emitToggleCollapse.emit(!this.helpPanelOpen);
  }


  setActivePanel(str: 'help' | 'system-diagram' | 'results' | 'nebs') {
    this.activePanel = str;
  }
  
}
