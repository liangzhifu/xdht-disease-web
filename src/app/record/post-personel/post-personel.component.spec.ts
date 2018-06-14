import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPersonelComponent } from './post-personel.component';

describe('PostPersonelComponent', () => {
  let component: PostPersonelComponent;
  let fixture: ComponentFixture<PostPersonelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPersonelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPersonelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
