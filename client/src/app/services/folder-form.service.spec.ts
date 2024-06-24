import { TestBed } from '@angular/core/testing';

import { FolderFormService } from './folder-form.service';

describe('FolderFormService', () => {
  let service: FolderFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolderFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
