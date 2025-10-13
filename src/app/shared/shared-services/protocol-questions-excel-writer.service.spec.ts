import { TestBed } from '@angular/core/testing';

import { ProtocolQuestionsExcelWriterService } from './protocol-questions-excel-writer.service';

describe('ProtocolQuestionsExcelWriterService', () => {
  let service: ProtocolQuestionsExcelWriterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtocolQuestionsExcelWriterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
