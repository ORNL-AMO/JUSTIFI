import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faExclamationCircle, faPersonWalkingArrowLoopLeft } from '@fortawesome/free-solid-svg-icons';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbFacility } from 'src/app/models/facility';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { UtilityOptions } from 'src/app/shared/constants/utilityTypes';

@Component({
  selector: 'app-data-follow-up',
  templateUrl: './data-follow-up.component.html',
  styleUrl: './data-follow-up.component.css',
  standalone: false
})
export class DataFollowUpComponent {

  faChevronLeft: IconDefinition = faChevronLeft;
  faChevronRight: IconDefinition = faChevronRight;
  faPersonWalkingArrowLoopLeft: IconDefinition = faPersonWalkingArrowLoopLeft;
  faExclamationCircle: IconDefinition = faExclamationCircle;

  onSiteVisit: IdbOnSiteVisit;

  facility: IdbFacility;

  numAssessments: number = 0;
  numEnergyOpportunities: number = 0;
  numNonEnergyBenefits: number = 0;


  followUpItems: Array<{
    label: string,
    linkUrl: string
  }>;

  constructor(private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private facilityIdbService: FacilityIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private assessmentIdbService: AssessmentIdbService
  ) {

  }

  ngOnInit() {
    this.onSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.facility = this.facilityIdbService.selectedFacility.getValue();
    this.setDataSummary();
    this.setFollowUpItems();
  }

  setDataSummary() {
    this.numAssessments = this.onSiteVisit.assessmentIds.length;
    this.numEnergyOpportunities = 0;
    this.numNonEnergyBenefits = 0;
    this.onSiteVisit.assessmentIds.forEach(assessmentId => {
      let energyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunityIdbService.getByOtherGuid(assessmentId, 'assessment');
      this.numEnergyOpportunities += energyOpportunities.length;

      let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitsIdbService.getAssessmentNonEnergyBenefits(assessmentId, false);
      this.numNonEnergyBenefits += nonEnergyBenefits.length;
    });
  }

  goNext() {
    this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid + '/executive-summary');
  }

  goBack() {
    if (this.onSiteVisit.assessmentIds.length === 0) {
      this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/manage-assessments')
    } else {
      this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + this.onSiteVisit.assessmentIds[this.onSiteVisit.assessmentIds.length - 1] + '/nebs');
    }
  }

  setFollowUpItems() {
    this.followUpItems = [];
    UtilityOptions.forEach((option) => {
      const utilityType = option.utilityType.replace(/\s+/g, ''); // Remove spaces
      const camelCaseType = utilityType.charAt(0).toLowerCase()
        + utilityType.slice(1); // Lowercase first letter
      if (this.facility.unitSettings[`include${utilityType}`]) {
        if (!this.facility.unitSettings[`${camelCaseType}Use`] || !this.facility.unitSettings[`${camelCaseType}Price`]) {
          this.followUpItems.push({
            label: `${option.utilityType} - baseline use or cost missing for facility.`,
            linkUrl: `/setup-wizard/pre-visit/${this.onSiteVisit.guid}/facility-setup`
          });
        }
      };
    });

    if (this.onSiteVisit.assessmentIds.length === 0) {
      this.followUpItems.push({
        label: 'No assessments created for this visit.',
        linkUrl: `/setup-wizard/data-collection/${this.onSiteVisit.guid}/manage-assessments`
      });
    } else {
      this.onSiteVisit.assessmentIds.forEach(assessmentId => {
        let assessment: IdbAssessment = this.assessmentIdbService.getByGuid(assessmentId);
        if (assessment.utilitySavingsByAssessment) {
          if (!assessment.implementationCost) {
            this.followUpItems.push({
              label: `Implementation cost missing for assessment: "${assessment.name}".`,
              linkUrl: `/setup-wizard/data-collection/${this.onSiteVisit.guid}/assessment/${assessment.guid}/details`
            })
          }
        } else {
          const energyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunityIdbService.getByOtherGuid(assessmentId, 'assessment');
          if (energyOpportunities.length === 0) {
            this.followUpItems.push({
              label: `No EEM's created for assessment: "${assessment.name}".`,
              linkUrl: `/setup-wizard/data-collection/${this.onSiteVisit.guid}/assessment/${assessment.guid}/energy-opportunities`
            });
          } else {
            energyOpportunities.forEach((opportunity) => {
              if (!opportunity.implementationCost) {
                this.followUpItems.push({
                  label: `Implementation cost missing for EEM: "${opportunity.name}" in assessment: "${assessment.name}".`,
                  linkUrl: `/setup-wizard/data-collection/${this.onSiteVisit.guid}/assessment/${assessment.guid}/energy-opportunities`
                });
              }
            });
          }
        }
      });

    }
  }
}
