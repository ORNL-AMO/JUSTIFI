import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphaDisclaimerComponent } from './alpha-disclaimer.component';
import { LocalStorageDataService } from 'src/app/shared/shared-services/local-storage-data.service';

describe('AlphaDisclaimerComponent', () => {
  let component: AlphaDisclaimerComponent;
  let fixture: ComponentFixture<AlphaDisclaimerComponent>;

  let localStorageDataService: Partial<LocalStorageDataService> = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlphaDisclaimerComponent],
      providers: [
        { provide: LocalStorageDataService, useValue: localStorageDataService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlphaDisclaimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
