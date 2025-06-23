import { TestBed } from '@angular/core/testing';

import { UserIdbService } from './user-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { stubServiceProviders } from '../spec-helpers/spec-test-service-stub';

describe('UserIdbService', () => {
  let service: UserIdbService;

  beforeEach(() => {
    let dbService: Partial<NgxIndexedDBService> = {}
    TestBed.configureTestingModule({
      providers: [
        ...stubServiceProviders,
        { provide: NgxIndexedDBService, useValue: dbService }
      ]
    });
    service = TestBed.inject(UserIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
