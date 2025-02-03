import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NebFormsAccordionComponent } from './neb-forms-accordion.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('NebFormsAccordionComponent', () => {
  let component: NebFormsAccordionComponent;
  let fixture: ComponentFixture<NebFormsAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [NebFormsAccordionComponent],
      providers: stubServiceProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NebFormsAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
