import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailsSummaryComponent } from './team-details-summary.component';
import { ContactSummaryCardComponent } from './contact-summary-card/contact-summary-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { BehaviorSubject } from 'rxjs';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit, getNewIdbOnSiteVisit } from 'src/app/models/onSiteVisit';

describe('TeamDetailsSummaryComponent', () => {
  let component: TeamDetailsSummaryComponent;
  let fixture: ComponentFixture<TeamDetailsSummaryComponent>;


  let contactIdbService: Partial<ContactIdbService> = {
    contacts: new BehaviorSubject<Array<IdbContact>>([])
  };
  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {
    selectedVisit: new BehaviorSubject<IdbOnSiteVisit>(getNewIdbOnSiteVisit('', '', ''))
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FontAwesomeModule, HelperPipesModule],
      declarations: [TeamDetailsSummaryComponent, ContactSummaryCardComponent],
      providers: [
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamDetailsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
