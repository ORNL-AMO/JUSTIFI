import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStakeholdersComponent } from './company-stakeholders.component';

describe('CompanyStakeholdersComponent', () => {
  let component: CompanyStakeholdersComponent;
  let fixture: ComponentFixture<CompanyStakeholdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyStakeholdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyStakeholdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
