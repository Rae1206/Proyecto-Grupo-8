import { TestBed } from '@angular/core/testing';

import { PatrocinadoresService } from './patrocinadores.service';

describe('PatrocinadoresService', () => {
  let service: PatrocinadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatrocinadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
