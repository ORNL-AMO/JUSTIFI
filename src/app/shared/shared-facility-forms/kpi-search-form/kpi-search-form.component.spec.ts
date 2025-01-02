import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiSearchFormComponent } from './kpi-search-form.component';
import { KpiListComponent } from './kpi-list/kpi-list.component';
import { AddKpiSearchComponent } from './add-kpi-search/add-kpi-search.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from '../../helper-pipes/_helper-pipes.module';
import { SelectedKpiOptionPipe } from './add-kpi-search/selected-kpi-option.pipe';
import { PrimaryKpiBadgeModule } from '../../primary-kpi-badge/primary-kpi-badge.module';

describe('KpiSearchFormComponent', () => {
  let component: KpiSearchFormComponent;
  let fixture: ComponentFixture<KpiSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, HelperPipesModule, PrimaryKpiBadgeModule],
      declarations: [KpiSearchFormComponent, KpiListComponent, AddKpiSearchComponent, SelectedKpiOptionPipe],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
