import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiDetailsFormComponent } from './kpi-details-form.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { KpmDatabaseModalComponent } from './kpm-database-modal/kpm-database-modal.component';
import { KpmImpactsTableComponent } from './kpm-impacts-table/kpm-impacts-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from '../../helper-pipes/_helper-pipes.module';
import { PrimaryKpiBadgeModule } from '../../primary-kpi-badge/primary-kpi-badge.module';
import { KpiDescriptionPipe } from './kpi-description.pipe';
import { KpmDetailsFormModule } from '../../kpm-details-form/kpm-details-form.module';
import { AssociatedContactsModule } from '../../associated-contacts/associated-contacts.module';

describe('KpiDetailsFormComponent', () => {
  let component: KpiDetailsFormComponent;
  let fixture: ComponentFixture<KpiDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule, PrimaryKpiBadgeModule, KpmDetailsFormModule, AssociatedContactsModule],
      declarations: [KpiDetailsFormComponent, KpmDatabaseModalComponent, KpmImpactsTableComponent, KpiDescriptionPipe],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
