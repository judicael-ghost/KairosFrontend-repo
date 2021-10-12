import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfftechComponent } from './afftech.component';

describe('AfftechComponent', () => {
  let component: AfftechComponent;
  let fixture: ComponentFixture<AfftechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfftechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfftechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
