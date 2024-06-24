import { TestBed } from '@angular/core/testing';

import { ListDocumentsService } from './list-documents.service';

describe('ListDocumentsService', () => {
  let service: ListDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
