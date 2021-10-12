import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcherAddComponent } from './marcher-add.component';

describe('MarcherAddComponent', () => {
  let component: MarcherAddComponent;
  let fixture: ComponentFixture<MarcherAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcherAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcherAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
