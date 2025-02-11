import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faCube, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbCompany } from 'src/app/models/company';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

@Component({
  selector: 'app-energy-equipment-discovery',
  standalone: false,

  templateUrl: './energy-equipment-discovery.component.html',
  styleUrl: './energy-equipment-discovery.component.css'
})
export class EnergyEquipmentDiscoveryComponent {
  faCube: IconDefinition = faCube;
  faChevronLeft: IconDefinition = faChevronLeft;

  energyEquipment: IdbEnergyEquipment;
  company: IdbCompany;
  constructor(private activatedRoute: ActivatedRoute,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private companyIdbService: CompanyIdbService,
    private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private assessmentIdbService: AssessmentIdbService
  ) {
  }

  ngOnInit() {
    this.company = this.companyIdbService.selectedCompany.getValue();
    this.activatedRoute.params.subscribe(params => {
      let equipmentId: string = params['id'];
      this.energyEquipment = this.energyEquipmentIdbService.getByGuid(equipmentId);
    });
  }

  goBack() {
    let assessment: IdbAssessment = this.assessmentIdbService.selectedAssessment.getValue();
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('/setup-wizard/data-collection/' + onSiteVisit.guid + '/assessment/' + assessment.guid + '/discovery');
  }
}
