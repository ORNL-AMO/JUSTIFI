import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faCircleQuestion, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { HelpContext } from './HelpContext';
import { Subscription } from 'rxjs';
import { SetupWizardService } from '../setup-wizard.service';

@Component({
    selector: 'app-setup-wizard-help-panel',
    templateUrl: './setup-wizard-help-panel.component.html',
    styleUrl: './setup-wizard-help-panel.component.css',
    standalone: false
})
export class SetupWizardHelpPanelComponent {
  @Output('emitToggleCollapse')
  emitToggleCollapse: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  faCircleQuestion: IconDefinition = faCircleQuestion;

  helpContext: HelpContext;
  helpLabel: string;
  routerSub: Subscription;
  helpPanelOpenSub: Subscription;
  helpPanelOpen: boolean;
  
  constructor(private router: Router,
    private setupWizardService: SetupWizardService
  ) {

  }

  ngOnInit() {
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setHelpContext(event.urlAfterRedirects);
      }
    });
    this.helpPanelOpenSub = this.setupWizardService.helpPanelOpen.subscribe(val => {
      this.helpPanelOpen = val;
      //needed to resize charts
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 100)
    });
    this.setHelpContext(this.router.url);
  }

  ngOnDestroy(){
    this.routerSub.unsubscribe();
    this.helpPanelOpenSub.unsubscribe();
  }

  toggleCollapseHelpPanel() {
    this.emitToggleCollapse.emit(!this.helpPanelOpen);
  }

  setHelpContext(url: string) {
    if (url.includes('company-setup')) {
      this.helpContext = 'company-setup';
      this.helpLabel = 'Company Setup Help';
    } else if (url.includes('company-contacts')) {
      this.helpContext = 'company-contacts';
      this.helpLabel = 'Stakeholder Help';
    } else if (url.includes('kpi-select')) {
      this.helpContext = 'kpi-select';
      this.helpLabel = 'KPI Select Help';
    } else if (url.includes('kpi-detail')) {
      this.helpContext = 'kpi-detail';
      this.helpLabel = 'KPI Details Help';
    } else if (url.includes('facility-setup')) {
      this.helpContext = 'facility-setup';
      this.helpLabel = 'Facility Setup Help';
    } else if (url.includes('energy-equipment') && !url.includes('discovery')) {
      this.helpContext = 'energy-equipment';
      this.helpLabel = 'Industrial System Inventory Help';
    } else if (url.includes('end-uses')) {
      this.helpContext = 'end-uses';
      this.helpLabel = 'End Uses Help';
    } else if (url.includes('pre-assessment')) {
      this.helpContext = 'pre-assessment';
      this.helpLabel = 'Pre-Assessment Help';
    } else if (url.includes('review-pre-visit')) {
      this.helpContext = 'review-pre-visit';
      this.helpLabel = 'Review Pre-Visit Help';
    } else if (url.includes('manage-assessments')) {
      this.helpContext = 'manage-assessments';
      this.helpLabel = 'Manage Assessments Help';
    } else if (url.includes('manage-assessments')) {
      this.helpContext = 'manage-assessments';
      this.helpLabel = 'Manage Assessments Help';
    } else if (url.includes('assessment') && url.includes('details')) {
      this.helpContext = 'assessment-details';
      this.helpLabel = 'Assessment Details Help';
    } else if (url.includes('assessment') && url.includes('energy-opportunities')) {
      this.helpContext = 'energy-opportunities';
      this.helpLabel = 'Energy Efficiency Opportunities Help';
    } else if (url.includes('assessment') && url.includes('nebs')) {
      this.helpContext = 'assessment-nebs';
      this.helpLabel = 'Assessment NEBs Help';
    } else if (url.includes('assessment') && url.includes('results')) {
      this.helpContext = 'assessment-results';
      this.helpLabel = 'Assessment Results Help';
    } else if (url.includes('follow-up')) {
      this.helpContext = 'follow-up';
      this.helpLabel = 'Follow Up Help';
    } else if (url.includes('assessment-report')) {
      this.helpContext = 'assessment-report';
      this.helpLabel = 'Assessment Report Help';
    } else if (url.includes('visit-report')) {
      this.helpContext = 'rollup-report';
      this.helpLabel = 'Rollup Report Help';
    }else if (url.includes('discovery')) {
      if(url.includes('energy-equipment')){
        this.helpContext = 'energy-equipment-discovery';
        this.helpLabel = 'Industrial System Inventory Discovery Help';
      }else if(url.includes('process-equipment')){
        this.helpContext = 'process-equipment-discovery';
        this.helpLabel = 'End Uses Discovery Help';
      }else{
        this.helpContext = 'discovery';
        this.helpLabel = 'Discovery Help';
      }
    }
    else {
      this.helpContext = undefined;
    }
  }
}
