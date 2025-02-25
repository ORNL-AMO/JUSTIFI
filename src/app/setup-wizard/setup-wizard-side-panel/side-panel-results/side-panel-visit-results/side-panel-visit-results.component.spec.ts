import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelVisitResultsComponent } from './side-panel-visit-results.component';

describe('SidePanelVisitResultsComponent', () => {
  let component: SidePanelVisitResultsComponent;
  let fixture: ComponentFixture<SidePanelVisitResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidePanelVisitResultsComponent]
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
