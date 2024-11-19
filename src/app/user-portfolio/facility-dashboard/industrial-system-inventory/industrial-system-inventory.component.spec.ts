import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrialSystemInventoryComponent } from './industrial-system-inventory.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('IndustrialSystemInventoryComponent', () => {
  let component: IndustrialSystemInventoryComponent;
  let fixture: ComponentFixture<IndustrialSystemInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule],
      declarations: [IndustrialSystemInventoryComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustrialSystemInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
