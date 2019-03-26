import { TestBed } from '@angular/core/testing';

import { ConsentService } from './consentservice.service';

describe('ConsentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsentService = TestBed.get(ConsentService);
    expect(service).toBeTruthy();
  });
});
