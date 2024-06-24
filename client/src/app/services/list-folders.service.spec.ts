import { TestBed } from '@angular/core/testing';

import { ListFoldersService } from './list-folders.service';

describe('ListFoldersService', () => {
  let service: ListFoldersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListFoldersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
