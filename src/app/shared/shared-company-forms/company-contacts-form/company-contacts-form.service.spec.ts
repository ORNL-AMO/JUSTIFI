import { TestBed } from '@angular/core/testing';

import { CompanyContactsFormService } from './company-contacts-form.service';

describe('CompanyContactsFormService', () => {
  let service: CompanyContactsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyContactsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
