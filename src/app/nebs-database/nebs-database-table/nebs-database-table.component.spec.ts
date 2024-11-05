import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NebsDatabaseTableComponent } from './nebs-database-table.component';

describe('NebsDatabaseTableComponent', () => {
  let component: NebsDatabaseTableComponent;
  let fixture: ComponentFixture<NebsDatabaseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NebsDatabaseTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NebsDatabaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
