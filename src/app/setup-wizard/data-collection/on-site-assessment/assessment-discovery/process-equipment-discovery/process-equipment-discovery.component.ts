import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faSplotch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

@Component({
  selector: 'app-process-equipment-discovery',
  standalone: false,

  templateUrl: './process-equipment-discovery.component.html',
  styleUrl: './process-equipment-discovery.component.css'
})
export class ProcessEquipmentDiscoveryComponent {
  faSplotch: IconDefinition = faSplotch;
  faChevronLeft: IconDefinition = faChevronLeft;

  processEquipment: IdbProcessEquipment;
  constructor(private activatedRoute: ActivatedRoute,
    private processEquipmentIdbService: ProcessEquipmentIdbService,
    private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private assessmentIdbService: AssessmentIdbService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let equipmentId: string = params['id'];
      this.processEquipment = this.processEquipmentIdbService.getByGuid(equipmentId);
    });
  }

  goBack() {
    let assessment: IdbAssessment = this.assessmentIdbService.selectedAssessment.getValue();
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('/setup-wizard/data-collection/' + onSiteVisit.guid + '/assessment/' + assessment.guid + '/discovery');
  }
}
