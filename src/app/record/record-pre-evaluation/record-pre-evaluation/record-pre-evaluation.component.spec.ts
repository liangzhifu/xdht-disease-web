import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordPreEvaluationComponent } from './record-pre-evaluation.component';

describe('RecordPreEvaluationComponent', () => {
  let component: RecordPreEvaluationComponent;
  let fixture: ComponentFixture<RecordPreEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordPreEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPreEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
