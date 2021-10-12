import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEditFichetechComponent } from './add-edit-edit-fichetech.component';

describe('AddEditEditFichetechComponent', () => {
  let component: AddEditEditFichetechComponent;
  let fixture: ComponentFixture<AddEditEditFichetechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditEditFichetechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEditFichetechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
