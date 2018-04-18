import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceElementComponent } from './annonce-element.component';

describe('AnnonceElementComponent', () => {
  let component: AnnonceElementComponent;
  let fixture: ComponentFixture<AnnonceElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnonceElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
