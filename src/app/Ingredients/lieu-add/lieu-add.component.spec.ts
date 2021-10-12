import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LieuAddComponent } from './lieu-add.component';

describe('LieuAddComponent', () => {
  let component: LieuAddComponent;
  let fixture: ComponentFixture<LieuAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LieuAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LieuAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
