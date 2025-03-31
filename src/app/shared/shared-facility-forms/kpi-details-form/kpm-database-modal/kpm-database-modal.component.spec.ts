import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpmDatabaseModalComponent } from './kpm-database-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { getNewKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { KeyPerformanceIndicatorOption } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';

describe('KpmDatabaseModalComponent', () => {
  let component: KpmDatabaseModalComponent;
  let fixture: ComponentFixture<KpmDatabaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [KpmDatabaseModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(KpmDatabaseModalComponent);
    component = fixture.componentInstance;
    let tmpIndicatorOption: KeyPerformanceIndicatorOption = {
      primaryKPI: 'Other',
      label: '',
      htmlLabel: '',
      optionValue: 'other'
    }
    component.keyPerformanceIndicator = getNewKeyPerformanceIndicator('', '', tmpIndicatorOption, false, '')
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
