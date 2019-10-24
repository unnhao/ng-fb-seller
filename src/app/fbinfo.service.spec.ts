import { TestBed } from '@angular/core/testing';

import { FbinfoService } from './fbinfo.service';

describe('FbinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FbinfoService = TestBed.get(FbinfoService);
    expect(service).toBeTruthy();
  });
});
