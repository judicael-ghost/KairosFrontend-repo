import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcherDetailsComponent } from './marcher-details.component';

describe('MarcherDetailsComponent', () => {
  let component: MarcherDetailsComponent;
  let fixture: ComponentFixture<MarcherDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcherDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
