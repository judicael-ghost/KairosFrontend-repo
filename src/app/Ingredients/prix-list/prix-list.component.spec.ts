import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrixListComponent } from './prix-list.component';

describe('PrixListComponent', () => {
  let component: PrixListComponent;
  let fixture: ComponentFixture<PrixListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrixListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrixListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
