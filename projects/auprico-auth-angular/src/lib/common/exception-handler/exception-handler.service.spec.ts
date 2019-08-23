import { TestBed, inject } from '@angular/core/testing';

import { ExceptionHandlerService } from './exception-handler.service';

describe('ExceptionHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExceptionHandlerService]
    });
  });

  it('should be created', inject([ExceptionHandlerService], (service: ExceptionHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
