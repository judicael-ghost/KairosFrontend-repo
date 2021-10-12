import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrixDetailsComponent } from './prix-details.component';

describe('PrixDetailsComponent', () => {
  let component: PrixDetailsComponent;
  let fixture: ComponentFixture<PrixDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrixDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrixDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
