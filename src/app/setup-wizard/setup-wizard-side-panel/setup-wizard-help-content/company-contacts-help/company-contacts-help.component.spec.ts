import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactsHelpComponent } from './company-contacts-help.component';

describe('CompanyContactsHelpComponent', () => {
  let component: CompanyContactsHelpComponent;
  let fixture: ComponentFixture<CompanyContactsHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyContactsHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyContactsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
