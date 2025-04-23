import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOnSiteVisitsComponent } from './manage-on-site-visits.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';

describe('ManageOnSiteVisitsComponent', () => {
  let component: ManageOnSiteVisitsComponent;
  let fixture: ComponentFixture<ManageOnSiteVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, HelperPipesModule],
      declarations: [ManageOnSiteVisitsComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOnSiteVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
