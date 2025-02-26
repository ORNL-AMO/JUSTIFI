import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelResultsComponent } from './side-panel-results.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('SidePanelResultsComponent', () => {
  let component: SidePanelResultsComponent;
  let fixture: ComponentFixture<SidePanelResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [SidePanelResultsComponent],
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
