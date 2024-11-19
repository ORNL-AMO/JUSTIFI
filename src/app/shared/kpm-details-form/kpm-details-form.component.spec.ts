import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpmDetailsFormComponent } from './kpm-details-form.component';
import { getCustomKPM } from '../constants/keyPerformanceMetrics';
import { LabelWithTooltipModule } from '../label-with-tooltip/label-with-tooltip.module';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from '../helper-pipes/_helper-pipes.module';

describe('KpmDetailsFormComponent', () => {
  let component: KpmDetailsFormComponent;
  let fixture: ComponentFixture<KpmDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelWithTooltipModule, FormsModule, HelperPipesModule],
      declarations: [KpmDetailsFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(KpmDetailsFormComponent);
    component = fixture.componentInstance;
    component.keyPerformanceMetric = getCustomKPM('other', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
