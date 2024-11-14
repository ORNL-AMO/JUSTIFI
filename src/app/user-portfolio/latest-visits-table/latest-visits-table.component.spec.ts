import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestVisitsTableComponent } from './latest-visits-table.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TablePaginationModule } from 'src/app/shared/table-pagination/table-pagination.module';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('LatestVisitsTableComponent', () => {
  let component: LatestVisitsTableComponent;
  let fixture: ComponentFixture<LatestVisitsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, TablePaginationModule, HelperPipesModule, RouterTestingModule],
      declarations: [LatestVisitsTableComponent],
      providers: stubServiceProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LatestVisitsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
