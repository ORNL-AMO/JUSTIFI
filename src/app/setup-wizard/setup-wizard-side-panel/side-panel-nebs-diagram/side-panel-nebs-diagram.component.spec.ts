import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelNebsDiagramComponent } from './side-panel-nebs-diagram.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('SidePanelNebsDiagramComponent', () => {
  let component: SidePanelNebsDiagramComponent;
  let fixture: ComponentFixture<SidePanelNebsDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [SidePanelNebsDiagramComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidePanelNebsDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
