import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NebsDatabaseTableComponent } from './nebs-database-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NebOptionsFilterPipe } from './neb-options-filter.pipe';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('NebsDatabaseTableComponent', () => {
  let component: NebsDatabaseTableComponent;
  let fixture: ComponentFixture<NebsDatabaseTableComponent>;

  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [NebsDatabaseTableComponent, NebOptionsFilterPipe],
      providers: stubServiceProviders
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
