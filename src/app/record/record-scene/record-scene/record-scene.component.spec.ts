import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordSceneComponent } from './record-scene.component';

describe('RecordSceneComponent', () => {
  let component: RecordSceneComponent;
  let fixture: ComponentFixture<RecordSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
