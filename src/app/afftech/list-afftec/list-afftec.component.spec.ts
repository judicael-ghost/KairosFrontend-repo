import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAfftecComponent } from './list-afftec.component';

describe('ListAfftecComponent', () => {
  let component: ListAfftecComponent;
  let fixture: ComponentFixture<ListAfftecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAfftecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAfftecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
