import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faPersonWalkingArrowLoopLeft } from '@fortawesome/free-solid-svg-icons';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

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

  onSiteVisit: IdbOnSiteVisit;
  constructor(private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService
  ) {

  }

  ngOnInit() {
    this.onSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
  }

  goNext() {
    this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid + '/executive-summary');
  }

  goBack() {
    //TODO: Issue 226
    // this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/review-data-collection');
    if (this.onSiteVisit.assessmentIds.length === 0) {
      this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/manage-assessments')
    } else {
      this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + this.onSiteVisit.assessmentIds[this.onSiteVisit.assessmentIds.length - 1] + '/nebs');
    }
  }
}
