import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faCircleQuestion, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { HelpContext } from './HelpContext';
import { LocalStorageDataService } from 'src/app/shared/shared-services/local-storage-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-setup-wizard-help-panel',
  templateUrl: './setup-wizard-help-panel.component.html',
  styleUrl: './setup-wizard-help-panel.component.css'
})
export class SetupWizardHelpPanelComponent {


  collapseHelpPanel: boolean = false;
  faCircleQuestion: IconDefinition = faCircleQuestion;

  helpContext: HelpContext;
  helpLabel: string;
  routerSub: Subscription;
  constructor(private router: Router, private localStorageDataService: LocalStorageDataService) {

  }

  ngOnInit() {
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setHelpContext(event.urlAfterRedirects);
      }
    });
    this.collapseHelpPanel = this.localStorageDataService.setupHelpPanelCollapsed;
    this.setHelpContext(this.router.url);
  }

  ngOnDestroy(){
    this.routerSub.unsubscribe();
  }

  toggleCollapseHelpPanel() {
    this.collapseHelpPanel = !this.collapseHelpPanel;
    this.localStorageDataService.setSetupPanelCollapsed(this.collapseHelpPanel);
    //needed to resize charts
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100)
  }

  setHelpContext(url: string) {
    if (url.includes('company-setup')) {
      this.helpContext = 'company-setup';
      this.helpLabel = 'Company Setup Help';
    } else if (url.includes('company-contacts')) {
      this.helpContext = 'company-contacts';
      this.helpLabel = 'Stakeholder Help';
    } else if (url.includes('company-kpi-select')) {
      this.helpContext = 'company-kpi-select';
      this.helpLabel = 'KPI Select Help';
    } else if (url.includes('company-kpi-detail')) {
      this.helpContext = 'company-kpi-detail';
      this.helpLabel = 'KPI Details Help';
    } else if (url.includes('facility-setup')) {
      this.helpContext = 'facility-setup';
      this.helpLabel = 'Facility Setup Help';
    } else if (url.includes('energy-equipment')) {
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
    }
    else {
      this.helpContext = undefined;
    }
  }
}
