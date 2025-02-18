import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelResultsComponent } from './side-panel-results.component';

describe('SidePanelResultsComponent', () => {
  let component: SidePanelResultsComponent;
  let fixture: ComponentFixture<SidePanelResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidePanelResultsComponent]
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
