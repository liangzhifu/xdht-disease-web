import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPersonnelManageComponent } from './post-personnel-manage.component';

describe('PostPersonnelManageComponent', () => {
  let component: PostPersonnelManageComponent;
  let fixture: ComponentFixture<PostPersonnelManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPersonnelManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPersonnelManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
