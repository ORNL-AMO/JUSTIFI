import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelSystemDiagramComponent } from './side-panel-system-diagram.component';

describe('SidePanelSystemDiagramComponent', () => {
  let component: SidePanelSystemDiagramComponent;
  let fixture: ComponentFixture<SidePanelSystemDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidePanelSystemDiagramComponent]
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
