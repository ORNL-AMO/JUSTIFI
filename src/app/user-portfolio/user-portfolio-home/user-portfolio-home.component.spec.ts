import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPortfolioHomeComponent } from './user-portfolio-home.component';

describe('UserPortfolioHomeComponent', () => {
  let component: UserPortfolioHomeComponent;
  let fixture: ComponentFixture<UserPortfolioHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPortfolioHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPortfolioHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
