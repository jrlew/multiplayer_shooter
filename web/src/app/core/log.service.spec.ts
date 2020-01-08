import { TestBed } from '@angular/core/testing';

import { LogService } from './log.service';

describe('LoggingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogService = TestBed.get(LogService);
    expect(service).toBeTruthy();
  });
});
