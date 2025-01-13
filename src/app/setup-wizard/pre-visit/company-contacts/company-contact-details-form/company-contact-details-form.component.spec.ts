import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactDetailsFormComponent } from './company-contact-details-form.component';

describe('CompanyContactDetailsFormComponent', () => {
  let component: CompanyContactDetailsFormComponent;
  let fixture: ComponentFixture<CompanyContactDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyContactDetailsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyContactDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
