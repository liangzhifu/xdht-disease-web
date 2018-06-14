import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordPreEvaluationManageComponent } from './record-pre-evaluation-manage.component';

describe('RecordPreEvaluationManageComponent', () => {
  let component: RecordPreEvaluationManageComponent;
  let fixture: ComponentFixture<RecordPreEvaluationManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordPreEvaluationManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPreEvaluationManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
