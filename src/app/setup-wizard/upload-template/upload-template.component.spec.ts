import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UploadTemplateComponent } from './upload-template.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('UploadTemplateComponent', () => {
  let component: UploadTemplateComponent;
  let fixture: ComponentFixture<UploadTemplateComponent>;
  let locationSpy: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    locationSpy = jasmine.createSpyObj<Location>('Location', ['back']);

    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [UploadTemplateComponent],
      providers: [
        ...stubServiceProviders,
        { provide: Location, useValue: locationSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return to the previous page when the footer button is clicked', () => {
    const backButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[aria-label="Go back"]');

    backButton.click();

    expect(locationSpy.back).toHaveBeenCalled();
  });
});
