import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactsSetupFormComponent } from './company-contacts-setup-form.component';

describe('CompanyContactsSetupFormComponent', () => {
  let component: CompanyContactsSetupFormComponent;
  let fixture: ComponentFixture<CompanyContactsSetupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyContactsSetupFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyContactsSetupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
