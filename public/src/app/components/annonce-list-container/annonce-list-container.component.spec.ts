import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceListContainerComponent } from './annonce-list-container.component';

describe('AnnonceListContainerComponent', () => {
  let component: AnnonceListContainerComponent;
  let fixture: ComponentFixture<AnnonceListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnonceListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
