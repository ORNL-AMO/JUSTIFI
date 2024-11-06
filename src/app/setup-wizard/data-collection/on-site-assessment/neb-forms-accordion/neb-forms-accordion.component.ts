import { ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import * as _ from 'lodash';
import { IconDefinition, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { BootstrapService } from 'src/app/shared/shared-services/bootstrap.service';
import { LocalStorageDataService } from 'src/app/shared/shared-services/local-storage-data.service';

@Component({
  selector: 'app-neb-forms-accordion',
  templateUrl: './neb-forms-accordion.component.html',
  styleUrl: './neb-forms-accordion.component.css'
})
export class NebFormsAccordionComponent {
  @Input()
  energyOpportunity: IdbEnergyOpportunity;
  @Input()
  assessment: IdbAssessment;

  faWeightHanging: IconDefinition = faWeightHanging;

  nebGuids: Array<string> = [];
  nonEnergyBenefitsSub: Subscription;
  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  accordionGuid: string;
  isAddNew: boolean = false;
  isOnInit: boolean = true;
  constructor(private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private bootstrapService: BootstrapService,
    private cd: ChangeDetectorRef,
    private localStorageDataService: LocalStorageDataService
  ) {

  }

  ngOnInit() {
    this.nonEnergyBenefitsSub = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.subscribe(_nonEnergyBenefits => {
      this.nonEnergyBenefits = _nonEnergyBenefits;
      if (this.energyOpportunity) {
        this.setEnergyOpportunityNebGuids();
      } else if (this.assessment) {
        this.setAssessmentNebGuids();
      }
    });
    this.isOnInit = false;
  }

  ngOnDestroy() {
    this.nonEnergyBenefitsSub.unsubscribe();
  }

  ngAfterViewInit() {
    //open the accordion for last viewed neb
    let lastNebGuid: string = this.localStorageDataService.nebAccordionGuid;
    if (lastNebGuid && this.nebGuids.includes(lastNebGuid)) {
      this.toggleBS(lastNebGuid);
      this.cd.detectChanges();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['energyOpportunity'] && !changes['energyOpportunity'].firstChange) {
      this.setEnergyOpportunityNebGuids();
    } else if (changes['assessment'] && !changes['assessment'].firstChange) {
      this.setAssessmentNebGuids();
    }
  }


  setEnergyOpportunityNebGuids() {
    // only want to update neb list if changes made
    // otherwise forms get re-init when the list updates
    if (this.energyOpportunity && this.nonEnergyBenefits) {
      let energyOpportunityNebs: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefits.filter(neb => {
        return neb.energyOpportunityId == this.energyOpportunity.guid
      });
      let tmpOpportunityNebs: Array<string> = energyOpportunityNebs.map(neb => {
        return neb.guid
      });
      if (tmpOpportunityNebs.length != this.nebGuids.length) {
        if (this.isOnInit == false && tmpOpportunityNebs.length > this.nebGuids.length) {
          this.isAddNew = true;
        }
        this.nebGuids = tmpOpportunityNebs;
      } else {
        let xor: Array<string> = _.xor(this.nebGuids, tmpOpportunityNebs)
        if (xor.length != 0) {
          this.nebGuids = tmpOpportunityNebs;
        }
      }
    } else {
      this.nebGuids = [];
    }
  }

  setAssessmentNebGuids() {
    // only want to update neb list if changes made
    // otherwise forms get re-init when the list updates
    if (this.assessment && this.nonEnergyBenefits) {
      let assessmentNebs: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefits.filter(neb => {
        return neb.assessmentId == this.assessment.guid && neb.energyOpportunityId == undefined
      });
      let tmpAssessmentNebs: Array<string> = assessmentNebs.map(neb => {
        return neb.guid
      });
      if (tmpAssessmentNebs.length != this.nebGuids.length) {
        if (this.isOnInit == false && tmpAssessmentNebs.length > this.nebGuids.length) {
          this.isAddNew = true;
        }
        this.nebGuids = tmpAssessmentNebs;
      } else {
        let xor: Array<string> = _.xor(this.nebGuids, tmpAssessmentNebs)
        if (xor.length != 0) {
          this.nebGuids = tmpAssessmentNebs;
        }
      }
    } else {
      this.nebGuids = [];
    }
  }

  toggleBS(nebGuid: string) {
    this.bootstrapService.bsCollapse('#' + nebGuid);
    if (this.accordionGuid != nebGuid) {
      this.accordionGuid = nebGuid;
    } else {
      this.accordionGuid = undefined;
    }
    this.localStorageDataService.setNebAccordionGuid(this.accordionGuid);
  }

  childFormInitialized(oppGuid: string, isLast: boolean) {
    if (this.isAddNew == true && isLast) {
      this.toggleBS(oppGuid);
      this.isAddNew = false;
      this.cd.detectChanges();
    }
  }
}
