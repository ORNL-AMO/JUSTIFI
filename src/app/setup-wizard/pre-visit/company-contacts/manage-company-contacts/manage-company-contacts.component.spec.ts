import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompanyContactsComponent } from './manage-company-contacts.component';

describe('ManageCompanyContactsComponent', () => {
  let component: ManageCompanyContactsComponent;
  let fixture: ComponentFixture<ManageCompanyContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageCompanyContactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCompanyContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
