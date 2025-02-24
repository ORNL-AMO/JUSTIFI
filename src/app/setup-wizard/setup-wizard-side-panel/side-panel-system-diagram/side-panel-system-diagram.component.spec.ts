import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelSystemDiagramComponent } from './side-panel-system-diagram.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';

describe('SidePanelSystemDiagramComponent', () => {
  let component: SidePanelSystemDiagramComponent;
  let fixture: ComponentFixture<SidePanelSystemDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule],
      declarations: [SidePanelSystemDiagramComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidePanelSystemDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
