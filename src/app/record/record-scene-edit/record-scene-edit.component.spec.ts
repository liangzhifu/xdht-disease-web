import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordSceneEditComponent } from './record-scene-edit.component';

describe('RecordSceneEditComponent', () => {
  let component: RecordSceneEditComponent;
  let fixture: ComponentFixture<RecordSceneEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordSceneEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordSceneEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
