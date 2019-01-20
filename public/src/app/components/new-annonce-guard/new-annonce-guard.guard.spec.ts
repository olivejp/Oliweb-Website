import { TestBed, async, inject } from '@angular/core/testing';

import { NewAnnonceGuardGuard } from './new-annonce-guard.guard';

describe('NewAnnonceGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewAnnonceGuardGuard]
    });
  });

  it('should ...', inject([NewAnnonceGuardGuard], (guard: NewAnnonceGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
