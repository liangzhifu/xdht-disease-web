import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordSceneManageComponent } from './record-scene-manage.component';

describe('RecordSceneManageComponent', () => {
  let component: RecordSceneManageComponent;
  let fixture: ComponentFixture<RecordSceneManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordSceneManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordSceneManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
