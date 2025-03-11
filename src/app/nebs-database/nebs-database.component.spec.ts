import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NebsDatabaseComponent } from './nebs-database.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NebsDatabaseTableComponent } from './nebs-database-table/nebs-database-table.component';
import { NebOptionsFilterPipe } from './nebs-database-table/neb-options-filter.pipe';
import { FormsModule } from '@angular/forms';
import { stubServiceProviders } from '../spec-helpers/spec-test-service-stub';

describe('NebsDatabaseComponent', () => {
  let component: NebsDatabaseComponent;
  let fixture: ComponentFixture<NebsDatabaseComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [NebsDatabaseComponent, NebsDatabaseTableComponent, NebOptionsFilterPipe],
      providers: stubServiceProviders
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
