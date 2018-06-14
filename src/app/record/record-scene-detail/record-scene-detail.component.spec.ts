import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordSceneDetailComponent } from './record-scene-detail.component';

describe('RecordSceneDetailComponent', () => {
  let component: RecordSceneDetailComponent;
  let fixture: ComponentFixture<RecordSceneDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordSceneDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordSceneDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
