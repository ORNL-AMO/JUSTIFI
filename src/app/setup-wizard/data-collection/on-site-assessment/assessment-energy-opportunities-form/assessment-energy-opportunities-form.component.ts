import { ChangeDetectorRef, Component } from '@angular/core';
import { IconDefinition, faFileLines, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription, firstValueFrom } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity, getNewIdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { BootstrapService } from 'src/app/shared/shared-services/bootstrap.service';
import { LocalStorageDataService } from 'src/app/shared/shared-services/local-storage-data.service';

@Component({
  selector: 'app-assessment-energy-opportunities-form',
  templateUrl: './assessment-energy-opportunities-form.component.html',
  styleUrl: './assessment-energy-opportunities-form.component.css'
})
export class AssessmentEnergyOpportunitiesFormComponent {
  faFileLines: IconDefinition = faFileLines;
  faPlus: IconDefinition = faPlus;

  energyOpportuntiesSub: Subscription;
  energyOpportunities: Array<IdbEnergyOpportunity>;

  assessment: IdbAssessment;
  assessmentSub: Subscription;

  assessmentEnergyOpportunityGuids: Array<string> = [];

  accordionGuid: string;
  isAddNew: boolean;
  constructor(
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private bootstrapService: BootstrapService,
    private cd: ChangeDetectorRef,
    private localStorageDataService: LocalStorageDataService
  ) {
  }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      this.assessment = _assessment;
      this.setAssessmentEnergyOpportunityGuids();
    });

    this.energyOpportuntiesSub = this.energyOpportunityIdbService.energyOpportunities.subscribe(_energyOpportunities => {
      this.energyOpportunities = _energyOpportunities;
      this.setAssessmentEnergyOpportunityGuids();
    });
  }

  ngOnDestroy() {
    this.energyOpportuntiesSub.unsubscribe();
    this.assessmentSub.unsubscribe();
  }

  ngAfterViewInit() {
    //open the accordion for last viewed energy opp
    let energyOppGuid: string = this.localStorageDataService.energyOppAccordionGuid;
    if (energyOppGuid && this.assessmentEnergyOpportunityGuids.includes(energyOppGuid)) {
      this.toggleBS(energyOppGuid);
      this.cd.detectChanges();
    }
  }

  setAssessmentEnergyOpportunityGuids() {
    //only want to update opportunity list if changes made
    //otherwise forms get re-init when the list updates
    if (this.assessment && this.energyOpportunities) {
      let assessmentEnergyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunities.filter(opp => {
        return opp.assessmentId == this.assessment.guid
      });
      let tmpAssessmentOpportunities: Array<string> = assessmentEnergyOpportunities.map(opp => {
        return opp.guid
      });
      if (tmpAssessmentOpportunities.length != this.assessmentEnergyOpportunityGuids.length) {
        this.assessmentEnergyOpportunityGuids = tmpAssessmentOpportunities;
      } else {
        let notEqual: boolean = false;
        for (let i = 0; i < this.assessmentEnergyOpportunityGuids.length; i++) {
          if (tmpAssessmentOpportunities[i] != this.assessmentEnergyOpportunityGuids[i]) {
            notEqual = true;
          }
        }
        this.assessmentEnergyOpportunityGuids = tmpAssessmentOpportunities;
      }
    } else {
      this.assessmentEnergyOpportunityGuids = [];
    }
  }

  async addEnergyOpportunity() {
    this.isAddNew = true;
    let newOpportunity: IdbEnergyOpportunity = getNewIdbEnergyOpportunity(this.assessment.userId, this.assessment.companyId, 
      this.assessment.facilityId, this.assessment.guid, this.assessment.utilityEnergyUses);
    let assessmentEnergyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunities.filter(prj => {
      return prj.assessmentId == this.assessment.guid;
    });
    newOpportunity.name = 'Opportunity #' + (assessmentEnergyOpportunities.length + 1);
    await firstValueFrom(this.energyOpportunityIdbService.addWithObservable(newOpportunity));
    await this.energyOpportunityIdbService.setEnergyOpportunities();
  }

  toggleBS(opportunityGuid: string) {
    this.bootstrapService.bsCollapse('#' + opportunityGuid);
    if (this.accordionGuid != opportunityGuid) {
      this.accordionGuid = opportunityGuid;
    } else {
      this.accordionGuid = undefined;
    }
    this.localStorageDataService.setEnergyOppAccordionGuid(this.accordionGuid);
  }

  childFormInitialized(oppGuid: string) {
    if (this.isAddNew == true) {
      this.toggleBS(oppGuid);
      this.isAddNew = false;
      this.cd.detectChanges();
    }
  }
}
