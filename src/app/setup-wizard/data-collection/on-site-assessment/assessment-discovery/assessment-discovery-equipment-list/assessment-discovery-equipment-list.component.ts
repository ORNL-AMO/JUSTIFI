import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faClipboardQuestion, faCube, faLink, faPlus, faSplotch, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbContact } from 'src/app/models/contact';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
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
  faClipboardQuestion: IconDefinition = faClipboardQuestion;
  faUser: IconDefinition = faUser;

  assessmentSub: Subscription;
  assessment: IdbAssessment;

  energyEquipments: Array<IdbEnergyEquipment>;
  energyEquipmentsSub: Subscription;

  processEquipments: Array<IdbProcessEquipment>;
  processEquipmentsSub: Subscription;

  energyOpportunities: Array<IdbEnergyOpportunity>;
  energyOpportunitiesSub: Subscription;

  contacts: Array<IdbContact>
  contactsSub: Subscription;
  constructor(private assessmentIdbService: AssessmentIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private contactsIdbService: ContactIdbService
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
    });
    this.contactsSub = this.contactsIdbService.contacts.subscribe(contacts => {
      this.contacts = contacts;
    })
  }

  ngOnDestroy() {
    this.assessmentSub.unsubscribe();
    this.energyEquipmentsSub.unsubscribe();
    this.processEquipmentsSub.unsubscribe();
    this.energyOpportunitiesSub.unsubscribe();
    this.contactsSub.unsubscribe();
  }

  addEquipment() {

  }

  goToEnergyEquipment(equipment: IdbEnergyEquipment) {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('/setup-wizard/data-collection/' + onSiteVisit.guid + '/assessment/' + this.assessment.guid + '/discovery/energy-equipment/' + equipment.guid);
  }

  goToProcessEquipment(equipment: IdbProcessEquipment) {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('/setup-wizard/data-collection/' + onSiteVisit.guid + '/assessment/' + this.assessment.guid + '/discovery/process-equipment/' + equipment.guid);
  }
}
