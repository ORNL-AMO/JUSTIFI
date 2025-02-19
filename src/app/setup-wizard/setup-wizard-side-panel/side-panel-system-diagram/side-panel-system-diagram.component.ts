import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faAsterisk, faClipboardQuestion, faCube, faLink, faPlus, faSplotch, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbContact } from 'src/app/models/contact';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbFacility } from 'src/app/models/facility';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

@Component({
  selector: 'app-side-panel-system-diagram',
  standalone: false,

  templateUrl: './side-panel-system-diagram.component.html',
  styleUrl: './side-panel-system-diagram.component.css'
})
export class SidePanelSystemDiagramComponent {

  faSplotch: IconDefinition = faSplotch;
  faCube: IconDefinition = faCube;
  faLink: IconDefinition = faLink;
  faPlus: IconDefinition = faPlus;
  faClipboardQuestion: IconDefinition = faClipboardQuestion;
  faUser: IconDefinition = faUser;
  faAsterisk: IconDefinition = faLink;

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

  facility: IdbFacility;
  facilitySub: Subscription;
  inAssessment: boolean;
  routerSub: Subscription;
  constructor(private assessmentIdbService: AssessmentIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private contactsIdbService: ContactIdbService,
    private facilityIdbService: FacilityIdbService,
    private router: Router
  ) { }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      this.facility = _facility;
    })

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

    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setInAssessment();
      }
    });
    this.setInAssessment();
  }

  ngOnDestroy() {
    this.assessmentSub.unsubscribe();
    this.energyEquipmentsSub.unsubscribe();
    this.processEquipmentsSub.unsubscribe();
    this.energyOpportunitiesSub.unsubscribe();
    this.contactsSub.unsubscribe();
    this.facilitySub.unsubscribe();
    this.routerSub.unsubscribe();
  }

  setInAssessment(){
    this.inAssessment = this.router.url.includes('/assessment/');
  }

}
