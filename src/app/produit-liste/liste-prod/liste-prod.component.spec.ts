import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProdComponent } from './liste-prod.component';

describe('ListeProdComponent', () => {
  let component: ListeProdComponent;
  let fixture: ComponentFixture<ListeProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeProdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
