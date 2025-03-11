import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFollowUpHelpComponent } from './data-follow-up-help.component';

describe('DataFollowUpHelpComponent', () => {
  let component: DataFollowUpHelpComponent;
  let fixture: ComponentFixture<DataFollowUpHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataFollowUpHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataFollowUpHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
