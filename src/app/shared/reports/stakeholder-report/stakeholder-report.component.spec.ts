import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholderReportComponent } from './stakeholder-report.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { getNewIdbContact } from 'src/app/models/contact';
import { getNewIdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { HelperPipesModule } from '../../helper-pipes/_helper-pipes.module';

describe('StakeholderReportComponent', () => {
  let component: StakeholderReportComponent;
  let fixture: ComponentFixture<StakeholderReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelperPipesModule],
      declarations: [StakeholderReportComponent],
      providers: [
        ...stubServiceProviders,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StakeholderReportComponent);
    component = fixture.componentInstance;
    
    component.contact = getNewIdbContact('123', '123');
    component.onsiteVisit = getNewIdbOnSiteVisit('123', '123', '123');
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
