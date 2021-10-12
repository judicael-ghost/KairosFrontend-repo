import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrixAddComponent } from './prix-add.component';

describe('PrixAddComponent', () => {
  let component: PrixAddComponent;
  let fixture: ComponentFixture<PrixAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrixAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrixAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
