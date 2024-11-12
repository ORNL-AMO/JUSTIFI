import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStakeholdersHomeComponent } from './company-stakeholders-home.component';

describe('CompanyStakeholdersHomeComponent', () => {
  let component: CompanyStakeholdersHomeComponent;
  let fixture: ComponentFixture<CompanyStakeholdersHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyStakeholdersHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyStakeholdersHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
