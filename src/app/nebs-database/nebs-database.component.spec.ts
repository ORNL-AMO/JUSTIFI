import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NebsDatabaseComponent } from './nebs-database.component';

describe('NebsDatabaseComponent', () => {
  let component: NebsDatabaseComponent;
  let fixture: ComponentFixture<NebsDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NebsDatabaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NebsDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
