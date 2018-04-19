import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceCreationComponent } from './annonce-creation.component';

describe('AnnonceCreationComponent', () => {
  let component: AnnonceCreationComponent;
  let fixture: ComponentFixture<AnnonceCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnonceCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
