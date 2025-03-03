import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySetupHelpComponent } from './company-setup-help.component';

describe('CompanySetupHelpComponent', () => {
  let component: CompanySetupHelpComponent;
  let fixture: ComponentFixture<CompanySetupHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanySetupHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanySetupHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
