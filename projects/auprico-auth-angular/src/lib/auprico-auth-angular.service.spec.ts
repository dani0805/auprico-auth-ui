import { TestBed } from '@angular/core/testing';

import { AupricoAuthAngularService } from './auprico-auth-angular.service';

describe('AupricoAuthAngularService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AupricoAuthAngularService = TestBed.get(AupricoAuthAngularService);
    expect(service).toBeTruthy();
  });
});
