import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceService } from './annonce-service.component';

describe('AnnonceService', () => {
  let component: AnnonceService;
  let fixture: ComponentFixture<AnnonceService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnonceService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
