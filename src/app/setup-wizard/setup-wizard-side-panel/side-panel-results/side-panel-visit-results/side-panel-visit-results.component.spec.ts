import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelVisitResultsComponent } from './side-panel-visit-results.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';

describe('SidePanelVisitResultsComponent', () => {
  let component: SidePanelVisitResultsComponent;
  let fixture: ComponentFixture<SidePanelVisitResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule, TableEntriesModule],
      declarations: [SidePanelVisitResultsComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidePanelVisitResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
