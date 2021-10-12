import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRecetteComponent } from './add-edit-recette.component';

describe('AddEditRecetteComponent', () => {
  let component: AddEditRecetteComponent;
  let fixture: ComponentFixture<AddEditRecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRecetteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
