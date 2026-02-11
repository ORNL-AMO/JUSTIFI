import { TestBed } from '@angular/core/testing';

import { DataEvaluationExcelWriterService } from './data-evaluation-excel-writer.service';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('DataEvaluationExcelWriterService', () => {
  let service: DataEvaluationExcelWriterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: stubServiceProviders
    });
    service = TestBed.inject(DataEvaluationExcelWriterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
