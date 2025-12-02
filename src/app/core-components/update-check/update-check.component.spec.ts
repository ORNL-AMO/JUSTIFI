import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCheckComponent } from './update-check.component';
import { UpdateCheckService } from './update-check.service';

describe('UpdateCheckComponent', () => {
  let component: UpdateCheckComponent;
  let fixture: ComponentFixture<UpdateCheckComponent>;
  
  class UpdateCheckServiceStub {
    updateAvailable = { subscribe: () => {} };
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCheckComponent],
      providers: [
        { provide: UpdateCheckService, useClass: UpdateCheckServiceStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
