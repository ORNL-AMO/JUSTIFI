import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioItemsListComponent } from './portfolio-items-list.component';

describe('PortfolioItemsListComponent', () => {
  let component: PortfolioItemsListComponent;
  let fixture: ComponentFixture<PortfolioItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortfolioItemsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
