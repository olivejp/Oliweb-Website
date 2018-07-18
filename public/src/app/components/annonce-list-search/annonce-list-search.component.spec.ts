import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceListSearchComponent } from './annonce-list-search.component';

describe('AnnonceListSearchComponent', () => {
  let component: AnnonceListSearchComponent;
  let fixture: ComponentFixture<AnnonceListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnonceListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
