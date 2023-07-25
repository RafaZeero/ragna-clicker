import { TestBed } from '@angular/core/testing';

import { GameMechanicsService } from './game-mechanics.service';

describe('GameMechanicsService', () => {
  let service: GameMechanicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameMechanicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
