import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnSiteVisitPaybackTableComponent } from './on-site-visit-payback-table.component';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';
import { getOnSiteVisitReport } from '../../calculations/visitReport';

describe('OnSiteVisitPaybackTableComponent', () => {
  let component: OnSiteVisitPaybackTableComponent;
  let fixture: ComponentFixture<OnSiteVisitPaybackTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableEntriesModule],
      declarations: [OnSiteVisitPaybackTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnSiteVisitPaybackTableComponent);
    component = fixture.componentInstance;
    component.onSiteVisitReport = getOnSiteVisitReport([], [], [], [], [], []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
