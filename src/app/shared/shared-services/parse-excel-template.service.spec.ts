import { TestBed } from '@angular/core/testing';

import { ParseExcelTemplateService } from './parse-excel-template.service';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('ParseExcelTemplateService', () => {
  let service: ParseExcelTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: stubServiceProviders
    });
    service = TestBed.inject(ParseExcelTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
