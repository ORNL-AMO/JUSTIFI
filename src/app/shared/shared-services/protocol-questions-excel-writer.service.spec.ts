import { TestBed } from '@angular/core/testing';

import { ProtocolQuestionsExcelWriterService } from './protocol-questions-excel-writer.service';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('ProtocolQuestionsExcelWriterService', () => {
  let service: ProtocolQuestionsExcelWriterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: stubServiceProviders
    });
    service = TestBed.inject(ProtocolQuestionsExcelWriterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
