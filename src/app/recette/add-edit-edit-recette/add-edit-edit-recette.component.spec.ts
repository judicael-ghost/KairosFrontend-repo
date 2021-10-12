import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEditRecetteComponent } from './add-edit-edit-recette.component';

describe('AddEditEditRecetteComponent', () => {
  let component: AddEditEditRecetteComponent;
  let fixture: ComponentFixture<AddEditEditRecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditEditRecetteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEditRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
