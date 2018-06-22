import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPersonnelEditComponent } from './post-personnel-edit.component';

describe('PostPersonnelEditComponent', () => {
  let component: PostPersonnelEditComponent;
  let fixture: ComponentFixture<PostPersonnelEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPersonnelEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPersonnelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
