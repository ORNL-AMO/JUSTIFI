import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelResultsComponent } from './side-panel-results.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FormsModule } from '@angular/forms';
import { SidePanelVisitResultsComponent } from './side-panel-visit-results/side-panel-visit-results.component';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';

describe('SidePanelResultsComponent', () => {
  let component: SidePanelResultsComponent;
  let fixture: ComponentFixture<SidePanelResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, TableEntriesModule, HelperPipesModule],
      declarations: [SidePanelResultsComponent, SidePanelVisitResultsComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidePanelResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
