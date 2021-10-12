import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteAddComponent } from './unite-add.component';

describe('UniteAddComponent', () => {
  let component: UniteAddComponent;
  let fixture: ComponentFixture<UniteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniteAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
