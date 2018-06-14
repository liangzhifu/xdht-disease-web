import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneManageComponent } from './scene-manage.component';

describe('SceneManageComponent', () => {
  let component: SceneManageComponent;
  let fixture: ComponentFixture<SceneManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
