import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndUsesHelpComponent } from './end-uses-help.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('EndUsesHelpComponent', () => {
  let component: EndUsesHelpComponent;
  let fixture: ComponentFixture<EndUsesHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [EndUsesHelpComponent],
      providers: stubServiceProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EndUsesHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
