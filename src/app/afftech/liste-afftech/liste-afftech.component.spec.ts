import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAfftechComponent } from './liste-afftech.component';

describe('ListeAfftechComponent', () => {
  let component: ListeAfftechComponent;
  let fixture: ComponentFixture<ListeAfftechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAfftechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeAfftechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
