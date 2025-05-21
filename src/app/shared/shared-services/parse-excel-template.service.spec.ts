import { TestBed } from '@angular/core/testing';

import { ParseExcelTemplateService } from './parse-excel-template.service';

describe('ParseExcelTemplateService', () => {
  let service: ParseExcelTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParseExcelTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
