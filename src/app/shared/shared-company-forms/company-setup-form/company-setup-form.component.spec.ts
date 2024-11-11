import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySetupFormComponent } from './company-setup-form.component';

describe('CompanySetupFormComponent', () => {
  let component: CompanySetupFormComponent;
  let fixture: ComponentFixture<CompanySetupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanySetupFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanySetupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
