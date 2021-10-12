import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFichetechComponent } from './liste-fichetech.component';

describe('ListeFichetechComponent', () => {
  let component: ListeFichetechComponent;
  let fixture: ComponentFixture<ListeFichetechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeFichetechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFichetechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
