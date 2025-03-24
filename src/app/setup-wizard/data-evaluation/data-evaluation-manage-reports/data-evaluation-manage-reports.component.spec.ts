import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEvaluationManageReportsComponent } from './data-evaluation-manage-reports.component';

describe('DataEvaluationManageReportsComponent', () => {
  let component: DataEvaluationManageReportsComponent;
  let fixture: ComponentFixture<DataEvaluationManageReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataEvaluationManageReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataEvaluationManageReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
