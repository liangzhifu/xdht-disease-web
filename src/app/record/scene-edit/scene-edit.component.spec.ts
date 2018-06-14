import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneEditComponent } from './scene-edit.component';

describe('SceneEditComponent', () => {
  let component: SceneEditComponent;
  let fixture: ComponentFixture<SceneEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
