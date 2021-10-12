import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFichetechComponent } from './add-edit-fichetech.component';

describe('AddEditFichetechComponent', () => {
  let component: AddEditFichetechComponent;
  let fixture: ComponentFixture<AddEditFichetechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFichetechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFichetechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
