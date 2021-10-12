import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcherListComponent } from './marcher-list.component';

describe('MarcherListComponent', () => {
  let component: MarcherListComponent;
  let fixture: ComponentFixture<MarcherListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcherListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
