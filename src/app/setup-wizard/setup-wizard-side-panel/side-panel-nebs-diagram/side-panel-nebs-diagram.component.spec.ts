import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelNebsDiagramComponent } from './side-panel-nebs-diagram.component';

describe('SidePanelNebsDiagramComponent', () => {
  let component: SidePanelNebsDiagramComponent;
  let fixture: ComponentFixture<SidePanelNebsDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidePanelNebsDiagramComponent]
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
