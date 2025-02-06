import { Component } from '@angular/core';
import { faCube, faLink, faPlus, faSplotch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

@Component({
  selector: 'app-assessment-discovery-equipment-list',
  standalone: false,

  templateUrl: './assessment-discovery-equipment-list.component.html',
  styleUrl: './assessment-discovery-equipment-list.component.css'
})
export class AssessmentDiscoveryEquipmentListComponent {

  faSplotch: IconDefinition = faSplotch;
  faCube: IconDefinition = faCube;
  faLink: IconDefinition = faLink;
  faPlus: IconDefinition = faPlus;

  assessmentSub: Subscription;
  assessment: IdbAssessment;

  energyEquipments: Array<IdbEnergyEquipment>;
  energyEquipmentsSub: Subscription;

  processEquipments: Array<IdbProcessEquipment>;
  processEquipmentsSub: Subscription;

  energyOpportunities: Array<IdbEnergyOpportunity>;
  energyOpportunitiesSub: Subscription;
  constructor(private assessmentIdbService: AssessmentIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService
  ) { }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      this.assessment = _assessment;
    });
    this.processEquipmentsSub = this.processEquipmentIdbService.processEquipments.subscribe(equipments => {
      this.processEquipments = equipments;
    });
    this.energyEquipmentsSub = this.energyEquipmentIdbService.energyEquipments.subscribe(equipments => {
      this.energyEquipments = equipments;
    });
    this.energyOpportunitiesSub = this.energyOpportunityIdbService.energyOpportunities.subscribe(opportunities => {
      this.energyOpportunities = opportunities;
    })
  }

  ngOnDestroy() {
    this.assessmentSub.unsubscribe();
    this.energyEquipmentsSub.unsubscribe();
    this.processEquipmentsSub.unsubscribe();
    this.energyOpportunitiesSub.unsubscribe();
  }

  addEquipment(){
    
  }

}
